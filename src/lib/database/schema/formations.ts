import { pgTable, varchar, integer, timestamp, serial } from 'drizzle-orm/pg-core';

export const formations = pgTable('formations', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 64 }).unique(),
  title: varchar('title', { length: 128 }),
  subtitle: varchar('subtitle', { length: 128 }),
  description: varchar('description', { length: 512 }),
  level: varchar('level', { length: 64 }),
  duration: varchar('duration', { length: 64 }),
  participants: varchar('participants', { length: 64 }),
  price: varchar('price', { length: 32 }),
  features: varchar('features', { length: 256 }),
  image_path: varchar('image_path', { length: 256 }),
  badge: varchar('badge', { length: 64 }),
  sort_order: integer('sort_order'),
  created_at: timestamp('created_at', { mode: 'string' }).defaultNow(),
  updated_at: timestamp('updated_at', { mode: 'string' }).defaultNow(),
});