import { asc, desc, eq, sql } from "drizzle-orm";
import { getDb } from "../../db";
import { batchProducts, batches, categories, inventoryItems, orders, products } from "../../db/schema";

export async function getProducts() {
  try {
    const db = await getDb();
    return await db.select({
      id: products.id, name: products.name, category: categories.name,
      priceCents: products.basePriceCents, costCents: products.baseCostCents,
      operationalType: products.operationalType, status: products.status,
    }).from(products).leftJoin(categories, eq(products.categoryId, categories.id)).orderBy(asc(products.name));
  } catch { return []; }
}

export async function getInventory() {
  try { const db = await getDb(); return await db.select().from(inventoryItems).orderBy(asc(inventoryItems.name)); }
  catch { return []; }
}

export async function getBatches() {
  try {
    const db = await getDb();
    return await db.select({
      id: batches.id, name: batches.name, status: batches.status,
      productionAt: batches.productionAt, capacityTotal: batches.capacityTotal,
      reservedTotal: batches.reservedTotal, paidTotal: batches.paidTotal,
      productName: products.name,
    }).from(batches)
      .leftJoin(batchProducts, eq(batchProducts.batchId, batches.id))
      .leftJoin(products, eq(batchProducts.productId, products.id))
      .orderBy(desc(batches.productionAt));
  } catch { return []; }
}

export async function getOrders() {
  try { const db = await getDb(); return await db.select().from(orders).orderBy(desc(orders.fulfillmentAt)).limit(100); }
  catch { return []; }
}

export async function getDashboardMetrics() {
  try {
    const db = await getDb();
    const [[orderCount], [batchCount], [lowStock]] = await Promise.all([
      db.select({ value: sql<number>`count(*)` }).from(orders),
      db.select({ value: sql<number>`count(*)` }).from(batches),
      db.select({ value: sql<number>`count(*)` }).from(inventoryItems).where(sql`${inventoryItems.currentQuantity} <= ${inventoryItems.minimumQuantity}`),
    ]);
    return { orders: Number(orderCount.value), batches: Number(batchCount.value), lowStock: Number(lowStock.value) };
  } catch { return { orders: 0, batches: 0, lowStock: 0 }; }
}
