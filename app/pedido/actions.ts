"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { getDb } from "../../db";
import { categories, orderItems, orders, products as dbProducts } from "../../db/schema";
import { products as catalogProducts, type Product } from "../data/catalog";

function value(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function required(formData: FormData, key: string, label: string) {
  const result = value(formData, key);
  if (!result) throw new Error(`Informe ${label}.`);
  return result;
}

type CartSelection = { catalogProduct: Product; quantity: number };

function readCart(formData: FormData): CartSelection[] {
  let submitted: unknown;
  try {
    submitted = JSON.parse(required(formData, "cartJson", "ao menos um produto"));
  } catch {
    throw new Error("O carrinho está inválido. Revise os produtos escolhidos.");
  }
  if (!Array.isArray(submitted) || submitted.length === 0) throw new Error("Adicione ao menos um produto ao carrinho.");

  const quantities = new Map<string, number>();
  for (const item of submitted) {
    if (!item || typeof item !== "object") continue;
    const slug = String((item as { slug?: unknown }).slug ?? "");
    const quantity = Math.max(1, Math.min(20, Number.parseInt(String((item as { quantity?: unknown }).quantity ?? 1), 10) || 1));
    if (catalogProducts.some((product) => product.slug === slug)) quantities.set(slug, Math.min(20, (quantities.get(slug) ?? 0) + quantity));
  }

  const selections = [...quantities].map(([slug, quantity]) => ({ catalogProduct: catalogProducts.find((product) => product.slug === slug)!, quantity }));
  if (selections.length === 0) throw new Error("Adicione ao menos um produto válido ao carrinho.");
  if (selections.reduce((total, item) => total + item.quantity, 0) > 100) throw new Error("O pedido pode ter no máximo 100 unidades.");
  return selections;
}

export async function createPublicOrder(formData: FormData) {
  const buyerName = required(formData, "buyerName", "seu nome");
  const buyerPhone = required(formData, "buyerPhone", "seu WhatsApp");
  const cart = readCart(formData);
  const fulfillmentAt = new Date(required(formData, "fulfillmentAt", "a data desejada"));
  if (Number.isNaN(fulfillmentAt.getTime())) throw new Error("Data inválida.");

  const fulfillmentType = value(formData, "fulfillmentType") === "delivery" ? "delivery" : "pickup";
  const db = await getDb();
  const now = new Date();
  let [category] = await db.select().from(categories).where(eq(categories.slug, "catalogo-publico")).limit(1);
  if (!category) {
    category = {
      id: crypto.randomUUID(), name: "Catálogo público", slug: "catalogo-publico",
      description: "Produtos apresentados no site.", sortOrder: 0, status: "active" as const,
      createdAt: now, updatedAt: now,
    };
    await db.insert(categories).values(category);
  }

  const persistedProducts = new Map<string, typeof dbProducts.$inferSelect>();
  for (const { catalogProduct } of cart) {
    let [product] = await db.select().from(dbProducts).where(eq(dbProducts.slug, catalogProduct.slug)).limit(1);
    if (!product) {
      product = {
        id: crypto.randomUUID(), categoryId: category.id, name: catalogProduct.name, slug: catalogProduct.slug,
        description: catalogProduct.description, operationalType: catalogProduct.slug.includes("focaccia") ? "batch" as const : "made_to_order" as const,
        minimumLeadMinutes: 1440, basePriceCents: catalogProduct.priceCents, baseCostCents: null,
        status: catalogProduct.priceCents == null ? "inquiry" as const : "active" as const,
        createdAt: now, updatedAt: now,
      };
      await db.insert(dbProducts).values(product);
    }
    persistedProducts.set(catalogProduct.slug, product);
  }

  const subtotalCents = cart.reduce((total, item) => total + (item.catalogProduct.priceCents ?? 0) * item.quantity, 0);
  const orderId = crypto.randomUUID();
  const trackingToken = crypto.randomUUID();
  const code = `CS-${Date.now().toString().slice(-7)}`;
  const details = [
    value(formData, "occasion") && `Ocasião: ${value(formData, "occasion")}`,
    value(formData, "cardStyle") && `Modelo do cartão: ${value(formData, "cardStyle")}`,
    value(formData, "cardMessage") && `Mensagem: ${value(formData, "cardMessage")}`,
    value(formData, "customization") && `Personalização: ${value(formData, "customization")}`,
    fulfillmentType === "delivery" && value(formData, "address") && `Endereço: ${value(formData, "address")}`,
    value(formData, "reference") && `Referência: ${value(formData, "reference")}`,
    value(formData, "notes") && `Observações: ${value(formData, "notes")}`,
  ].filter(Boolean).join("\n");

  await db.insert(orders).values({
    id: orderId, code, buyerName, buyerPhone,
    recipientName: value(formData, "recipientName") || null,
    recipientPhone: value(formData, "recipientPhone") || null,
    fulfillmentType, fulfillmentAt,
    subtotalCents, deliveryCents: 0, discountCents: 0, totalCents: subtotalCents,
    status: "pending_payment", trackingToken,
    reservationExpiresAt: new Date(now.getTime() + 30 * 60 * 1000),
    notes: details || null, createdAt: now, updatedAt: now,
  });

  await db.insert(orderItems).values(cart.map(({ catalogProduct, quantity }) => ({
    id: crypto.randomUUID(), orderId, productId: persistedProducts.get(catalogProduct.slug)!.id,
    productNameSnapshot: catalogProduct.name, quantity, unitPriceCents: catalogProduct.priceCents ?? 0,
    customizationJson: JSON.stringify({ occasion: value(formData, "occasion"), cardStyle: value(formData, "cardStyle"), cardMessage: value(formData, "cardMessage"), customization: value(formData, "customization") }),
    createdAt: now, updatedAt: now,
  })));

  redirect(`/pedido/confirmado?codigo=${encodeURIComponent(code)}`);
}
