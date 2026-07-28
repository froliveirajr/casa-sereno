"use server";

import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDb } from "../../db";
import {
  batchProducts,
  batches,
  categories,
  inventoryItems,
  inventoryMovements,
  orderItems,
  orders,
  products,
} from "../../db/schema";
import { getChatGPTUser } from "../chatgpt-auth";

function textValue(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function intValue(formData: FormData, key: string, fallback = 0) {
  const value = Number.parseInt(textValue(formData, key), 10);
  return Number.isFinite(value) ? value : fallback;
}

function moneyToCents(value: string) {
  const normalized = value.replace(/\./g, "").replace(",", ".");
  const amount = Number.parseFloat(normalized);
  return Number.isFinite(amount) ? Math.round(amount * 100) : 0;
}

function slugify(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

async function requireOperator() {
  const user = await getChatGPTUser();
  if (!user) throw new Error("Acesso não autorizado.");
  return user;
}

export async function createProduct(formData: FormData) {
  await requireOperator();
  const db = await getDb();
  const now = new Date();
  const name = textValue(formData, "name");
  const categoryName = textValue(formData, "category") || "Focaccias";
  const categorySlug = slugify(categoryName);
  const productSlug = `${slugify(name)}-${crypto.randomUUID().slice(0, 6)}`;
  if (!name) throw new Error("Informe o nome do produto.");

  let [category] = await db.select().from(categories).where(eq(categories.slug, categorySlug)).limit(1);
  if (!category) {
    category = {
      id: crypto.randomUUID(),
      name: categoryName,
      slug: categorySlug,
      description: null,
      sortOrder: 0,
      status: "active" as const,
      createdAt: now,
      updatedAt: now,
    };
    await db.insert(categories).values(category);
  }

  await db.insert(products).values({
    id: crypto.randomUUID(),
    categoryId: category.id,
    name,
    slug: productSlug,
    description: textValue(formData, "description") || "Produto artesanal Receber Bem.",
    operationalType: textValue(formData, "operationalType") === "batch" ? "batch" : "made_to_order",
    minimumLeadMinutes: intValue(formData, "minimumLeadHours", 24) * 60,
    basePriceCents: moneyToCents(textValue(formData, "price")),
    baseCostCents: moneyToCents(textValue(formData, "cost")),
    status: "active",
    createdAt: now,
    updatedAt: now,
  });
  revalidatePath("/admin/produtos");
  revalidatePath("/admin");
}

export async function createInventoryItem(formData: FormData) {
  await requireOperator();
  const now = new Date();
  const name = textValue(formData, "name");
  if (!name) throw new Error("Informe o item de estoque.");
  const db = await getDb();
  await db.insert(inventoryItems).values({
    id: crypto.randomUUID(),
    name,
    sku: textValue(formData, "sku") || `INS-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
    kind: (textValue(formData, "kind") || "ingredient") as "ingredient" | "packaging" | "finished_good",
    unit: (textValue(formData, "unit") || "unit") as "unit" | "gram" | "milliliter",
    currentQuantity: intValue(formData, "currentQuantity"),
    minimumQuantity: intValue(formData, "minimumQuantity"),
    averageUnitCostCents: moneyToCents(textValue(formData, "unitCost")),
    active: true,
    createdAt: now,
    updatedAt: now,
  });
  revalidatePath("/admin/estoque");
}

export async function registerStockMovement(formData: FormData) {
  const user = await requireOperator();
  const db = await getDb();
  const itemId = textValue(formData, "itemId");
  const type = textValue(formData, "type") as "entry" | "consumption" | "adjustment" | "loss";
  const rawQuantity = Math.abs(intValue(formData, "quantity"));
  const delta = type === "entry" || type === "adjustment" ? rawQuantity : -rawQuantity;
  if (!itemId || !rawQuantity) throw new Error("Informe o item e a quantidade.");
  const now = new Date();
  await db.insert(inventoryMovements).values({
    id: crypto.randomUUID(), itemId, type, quantityDelta: delta,
    reason: textValue(formData, "reason") || "Movimentação manual",
    actorEmail: user.email, occurredAt: now, createdAt: now,
  });
  await db.update(inventoryItems).set({
    currentQuantity: sql`${inventoryItems.currentQuantity} + ${delta}`,
    updatedAt: now,
  }).where(eq(inventoryItems.id, itemId));
  revalidatePath("/admin/estoque");
  revalidatePath("/admin");
}

export async function createBatch(formData: FormData) {
  await requireOperator();
  const db = await getDb();
  const now = new Date();
  const batchId = crypto.randomUUID();
  const productId = textValue(formData, "productId");
  const opensAt = new Date(textValue(formData, "opensAt"));
  const closesAt = new Date(textValue(formData, "closesAt"));
  const productionAt = new Date(textValue(formData, "productionAt"));
  const capacity = intValue(formData, "capacity", 1);
  if (!productId || [opensAt, closesAt, productionAt].some((date) => Number.isNaN(date.getTime()))) {
    throw new Error("Preencha produto e datas da fornada.");
  }
  const [product] = await db.select().from(products).where(eq(products.id, productId)).limit(1);
  if (!product) throw new Error("Produto não encontrado.");
  await db.insert(batches).values({
    id: batchId,
    name: textValue(formData, "name") || `Fornada ${product.name}`,
    status: "scheduled",
    opensAt, closesAt, productionAt,
    capacityTotal: capacity, reservedTotal: 0, paidTotal: 0,
    createdAt: now, updatedAt: now,
  });
  await db.insert(batchProducts).values({
    id: crypto.randomUUID(), batchId, productId,
    plannedQuantity: capacity, reservedQuantity: 0, producedQuantity: 0,
    unitPriceCents: product.basePriceCents ?? 0,
    createdAt: now, updatedAt: now,
  });
  revalidatePath("/admin/fornadas");
  revalidatePath("/admin");
}

export async function createOrder(formData: FormData) {
  await requireOperator();
  const db = await getDb();
  const now = new Date();
  const productId = textValue(formData, "productId");
  const quantity = Math.max(1, intValue(formData, "quantity", 1));
  const [product] = await db.select().from(products).where(eq(products.id, productId)).limit(1);
  if (!product) throw new Error("Selecione um produto.");
  const fulfillmentAt = new Date(textValue(formData, "fulfillmentAt"));
  if (Number.isNaN(fulfillmentAt.getTime())) throw new Error("Informe a data do pedido.");
  const orderId = crypto.randomUUID();
  const unitPrice = product.basePriceCents ?? 0;
  const total = unitPrice * quantity;
  await db.insert(orders).values({
    id: orderId,
    code: `RB-${Date.now().toString().slice(-7)}`,
    buyerName: textValue(formData, "buyerName"),
    buyerPhone: textValue(formData, "buyerPhone"),
    recipientName: textValue(formData, "recipientName") || null,
    recipientPhone: textValue(formData, "recipientPhone") || null,
    fulfillmentType: textValue(formData, "fulfillmentType") === "delivery" ? "delivery" : "pickup",
    fulfillmentAt,
    subtotalCents: total, deliveryCents: 0, discountCents: 0, totalCents: total,
    status: "pending_payment",
    trackingToken: crypto.randomUUID(),
    reservationExpiresAt: new Date(now.getTime() + 30 * 60 * 1000),
    notes: textValue(formData, "notes") || null,
    createdAt: now, updatedAt: now,
  });
  await db.insert(orderItems).values({
    id: crypto.randomUUID(), orderId, productId,
    productNameSnapshot: product.name, quantity, unitPriceCents: unitPrice,
    customizationJson: null, createdAt: now, updatedAt: now,
  });
  revalidatePath("/admin/pedidos");
  revalidatePath("/admin");
}
