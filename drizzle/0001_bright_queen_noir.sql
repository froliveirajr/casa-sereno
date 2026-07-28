CREATE TABLE `batch_products` (
	`id` text PRIMARY KEY NOT NULL,
	`batch_id` text NOT NULL,
	`product_id` text NOT NULL,
	`variant_id` text,
	`planned_quantity` integer NOT NULL,
	`reserved_quantity` integer DEFAULT 0 NOT NULL,
	`produced_quantity` integer DEFAULT 0 NOT NULL,
	`unit_price_cents` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`batch_id`) REFERENCES `batches`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`variant_id`) REFERENCES `product_variants`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `batch_products_batch_idx` ON `batch_products` (`batch_id`);--> statement-breakpoint
CREATE TABLE `inventory_items` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`sku` text NOT NULL,
	`kind` text NOT NULL,
	`unit` text NOT NULL,
	`current_quantity` integer DEFAULT 0 NOT NULL,
	`minimum_quantity` integer DEFAULT 0 NOT NULL,
	`average_unit_cost_cents` integer DEFAULT 0 NOT NULL,
	`active` integer DEFAULT true NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `inventory_items_sku_unique` ON `inventory_items` (`sku`);--> statement-breakpoint
CREATE TABLE `inventory_movements` (
	`id` text PRIMARY KEY NOT NULL,
	`item_id` text NOT NULL,
	`type` text NOT NULL,
	`quantity_delta` integer NOT NULL,
	`reason` text NOT NULL,
	`actor_email` text NOT NULL,
	`occurred_at` integer NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`item_id`) REFERENCES `inventory_items`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `inventory_movements_item_idx` ON `inventory_movements` (`item_id`,`occurred_at`);--> statement-breakpoint
CREATE TABLE `recipe_items` (
	`id` text PRIMARY KEY NOT NULL,
	`recipe_id` text NOT NULL,
	`inventory_item_id` text NOT NULL,
	`quantity_required` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`recipe_id`) REFERENCES `recipes`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`inventory_item_id`) REFERENCES `inventory_items`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `recipe_items_recipe_idx` ON `recipe_items` (`recipe_id`);--> statement-breakpoint
CREATE TABLE `recipes` (
	`id` text PRIMARY KEY NOT NULL,
	`product_id` text NOT NULL,
	`variant_id` text,
	`yield_quantity` integer DEFAULT 1 NOT NULL,
	`notes` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`variant_id`) REFERENCES `product_variants`(`id`) ON UPDATE no action ON DELETE no action
);
