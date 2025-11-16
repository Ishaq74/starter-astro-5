import { pgTable, varchar, integer, serial } from 'drizzle-orm/pg-core';

export const testimonials = pgTable('testimonials', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 64 }).unique(),
  name: varchar('name', { length: 128 }),
  role: varchar('role', { length: 128 }),
  image_path: varchar('image_path', { length: 256 }),
  rating: integer('rating'),
  text: varchar('text', { length: 512 }),
  service: varchar('service', { length: 128 }),
  sort_order: integer('sort_order'),
});