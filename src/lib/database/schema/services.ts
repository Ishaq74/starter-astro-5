import { pgTable, varchar, integer, serial } from 'drizzle-orm/pg-core';

export const services = pgTable('services', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 64 }).unique(),
  title: varchar('title', { length: 128 }),
  description: varchar('description', { length: 512 }),
  icon_name: varchar('icon_name', { length: 64 }),
  image_path: varchar('image_path', { length: 256 }),
  features: varchar('features', { length: 256 }),
  price: varchar('price', { length: 32 }),
  sort_order: integer('sort_order'),
});