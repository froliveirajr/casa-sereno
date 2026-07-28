import { index, integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

const timestamps = {
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
};

export const internalUsers = sqliteTable("internal_users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  role: text("role", { enum: ["admin", "production", "delivery"] }).notNull(),
  status: text("status", { enum: ["active", "inactive"] }).notNull().default("active"),
  ...timestamps,
});

export const categories = sqliteTable("categories", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  sortOrder: integer("sort_order").notNull().default(0),
  status: text("status", { enum: ["draft", "active", "hidden"] }).notNull().default("draft"),
  ...timestamps,
});

export const products = sqliteTable("products", {
  id: text("id").primaryKey(),
  categoryId: text("category_id").notNull().references(() => categories.id),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  operationalType: text("operational_type", { enum: ["made_to_order", "ready_stock", "controlled_stock", "batch"] }).notNull(),
  minimumLeadMinutes: integer("minimum_lead_minutes").notNull().default(0),
  basePriceCents: integer("base_price_cents"),
  baseCostCents: integer("base_cost_cents"),
  status: text("status", { enum: ["draft", "active", "seasonal", "sold_out", "paused", "inquiry"] }).notNull().default("draft"),
  ...timestamps,
}, (table) => [index("products_category_idx").on(table.categoryId)]);

export const productVariants = sqliteTable("product_variants", {
  id: text("id").primaryKey(),
  productId: text("product_id").notNull().references(() => products.id),
  name: text("name").notNull(),
  sku: text("sku").unique(),
  priceCents: integer("price_cents"),
  costCents: integer("cost_cents"),
  capacityWeight: integer("capacity_weight").notNull().default(1),
  active: integer("active", { mode: "boolean" }).notNull().default(true),
  ...timestamps,
}, (table) => [index("variants_product_idx").on(table.productId)]);

export const batches = sqliteTable("batches", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  status: text("status", { enum: ["scheduled", "open", "closed", "production", "completed", "cancelled"] }).notNull(),
  opensAt: integer("opens_at", { mode: "timestamp" }).notNull(),
  closesAt: integer("closes_at", { mode: "timestamp" }).notNull(),
  productionAt: integer("production_at", { mode: "timestamp" }).notNull(),
  capacityTotal: integer("capacity_total").notNull(),
  reservedTotal: integer("reserved_total").notNull().default(0),
  paidTotal: integer("paid_total").notNull().default(0),
  ...timestamps,
});

export const inventoryItems = sqliteTable("inventory_items", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  sku: text("sku").notNull().unique(),
  kind: text("kind", { enum: ["ingredient", "packaging", "finished_good"] }).notNull(),
  unit: text("unit", { enum: ["unit", "gram", "milliliter"] }).notNull(),
  currentQuantity: integer("current_quantity").notNull().default(0),
  minimumQuantity: integer("minimum_quantity").notNull().default(0),
  averageUnitCostCents: integer("average_unit_cost_cents").notNull().default(0),
  active: integer("active", { mode: "boolean" }).notNull().default(true),
  ...timestamps,
});

export const inventoryMovements = sqliteTable("inventory_movements", {
  id: text("id").primaryKey(),
  itemId: text("item_id").notNull().references(() => inventoryItems.id),
  type: text("type", { enum: ["entry", "consumption", "adjustment", "loss"] }).notNull(),
  quantityDelta: integer("quantity_delta").notNull(),
  reason: text("reason").notNull(),
  actorEmail: text("actor_email").notNull(),
  occurredAt: integer("occurred_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
}, (table) => [index("inventory_movements_item_idx").on(table.itemId, table.occurredAt)]);

export const recipes = sqliteTable("recipes", {
  id: text("id").primaryKey(),
  productId: text("product_id").notNull().references(() => products.id),
  variantId: text("variant_id").references(() => productVariants.id),
  yieldQuantity: integer("yield_quantity").notNull().default(1),
  notes: text("notes"),
  ...timestamps,
});

export const recipeItems = sqliteTable("recipe_items", {
  id: text("id").primaryKey(),
  recipeId: text("recipe_id").notNull().references(() => recipes.id),
  inventoryItemId: text("inventory_item_id").notNull().references(() => inventoryItems.id),
  quantityRequired: integer("quantity_required").notNull(),
  ...timestamps,
}, (table) => [index("recipe_items_recipe_idx").on(table.recipeId)]);

export const batchProducts = sqliteTable("batch_products", {
  id: text("id").primaryKey(),
  batchId: text("batch_id").notNull().references(() => batches.id),
  productId: text("product_id").notNull().references(() => products.id),
  variantId: text("variant_id").references(() => productVariants.id),
  plannedQuantity: integer("planned_quantity").notNull(),
  reservedQuantity: integer("reserved_quantity").notNull().default(0),
  producedQuantity: integer("produced_quantity").notNull().default(0),
  unitPriceCents: integer("unit_price_cents").notNull(),
  ...timestamps,
}, (table) => [index("batch_products_batch_idx").on(table.batchId)]);

export const orders = sqliteTable("orders", {
  id: text("id").primaryKey(),
  code: text("code").notNull().unique(),
  buyerName: text("buyer_name").notNull(),
  buyerPhone: text("buyer_phone").notNull(),
  recipientName: text("recipient_name"),
  recipientPhone: text("recipient_phone"),
  fulfillmentType: text("fulfillment_type", { enum: ["pickup", "delivery"] }).notNull(),
  fulfillmentAt: integer("fulfillment_at", { mode: "timestamp" }).notNull(),
  subtotalCents: integer("subtotal_cents").notNull(),
  deliveryCents: integer("delivery_cents").notNull().default(0),
  discountCents: integer("discount_cents").notNull().default(0),
  totalCents: integer("total_cents").notNull(),
  status: text("status", { enum: ["pending_payment", "confirmed", "production", "ready", "out_for_delivery", "completed", "cancelled", "expired"] }).notNull(),
  trackingToken: text("tracking_token").notNull().unique(),
  reservationExpiresAt: integer("reservation_expires_at", { mode: "timestamp" }),
  notes: text("notes"),
  ...timestamps,
}, (table) => [index("orders_status_fulfillment_idx").on(table.status, table.fulfillmentAt)]);

export const orderItems = sqliteTable("order_items", {
  id: text("id").primaryKey(),
  orderId: text("order_id").notNull().references(() => orders.id),
  productId: text("product_id").notNull().references(() => products.id),
  variantId: text("variant_id").references(() => productVariants.id),
  batchId: text("batch_id").references(() => batches.id),
  productNameSnapshot: text("product_name_snapshot").notNull(),
  quantity: integer("quantity").notNull(),
  unitPriceCents: integer("unit_price_cents").notNull(),
  customizationJson: text("customization_json"),
  ...timestamps,
}, (table) => [index("order_items_order_idx").on(table.orderId)]);

export const payments = sqliteTable("payments", {
  id: text("id").primaryKey(),
  orderId: text("order_id").notNull().references(() => orders.id),
  method: text("method", { enum: ["pix"] }).notNull().default("pix"),
  amountCents: integer("amount_cents").notNull(),
  status: text("status", { enum: ["pending", "confirmed", "failed", "refunded", "cancelled"] }).notNull(),
  confirmedBy: text("confirmed_by").references(() => internalUsers.id),
  confirmedAt: integer("confirmed_at", { mode: "timestamp" }),
  ...timestamps,
}, (table) => [index("payments_order_idx").on(table.orderId)]);

export const waitlistEntries = sqliteTable("waitlist_entries", {
  id: text("id").primaryKey(),
  productId: text("product_id").references(() => products.id),
  batchId: text("batch_id").references(() => batches.id),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  quantity: integer("quantity").notNull().default(1),
  consent: integer("consent", { mode: "boolean" }).notNull().default(false),
  ...timestamps,
});

export const auditEvents = sqliteTable("audit_events", {
  id: text("id").primaryKey(),
  actorId: text("actor_id").references(() => internalUsers.id),
  action: text("action").notNull(),
  entityType: text("entity_type").notNull(),
  entityId: text("entity_id").notNull(),
  beforeJson: text("before_json"),
  afterJson: text("after_json"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
}, (table) => [index("audit_entity_idx").on(table.entityType, table.entityId)]);

export const commercialMetrics = sqliteTable("commercial_metrics", {
  id: text("id").primaryKey(),
  metric: text("metric").notNull(),
  dimension: text("dimension"),
  value: real("value").notNull(),
  periodStart: integer("period_start", { mode: "timestamp" }).notNull(),
  periodEnd: integer("period_end", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});
