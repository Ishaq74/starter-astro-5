import { pgTable, varchar, integer, timestamp, serial } from 'drizzle-orm/pg-core';

export const gallery = pgTable('gallery', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 64 }).unique().notNull(),
  title: varchar('title', { length: 128 }).notNull(),
  description: varchar('description', { length: 512 }),
  category: varchar('category', { length: 64 }).notNull(),
  service_id: integer('service_id'),
  images: varchar('images', { length: 512 }).notNull(),
  featured_image: varchar('featured_image', { length: 256 }).notNull(),
  is_featured: integer('is_featured').default(0),
  sort_order: integer('sort_order').default(0),
  created_at: timestamp('created_at', { mode: 'string' }).defaultNow(),
  updated_at: timestamp('updated_at', { mode: 'string' }).defaultNow(),
});

export const galleryComments = pgTable('gallery_comments', {
  id: serial('id').primaryKey(),
  gallery_id: integer('gallery_id').notNull(),
  name: varchar('name', { length: 128 }).notNull(),
  email: varchar('email', { length: 128 }).notNull(),
  comment: varchar('comment', { length: 512 }).notNull(),
  rating: integer('rating'),
  is_approved: integer('is_approved').default(0),
  created_at: timestamp('created_at', { mode: 'string' }).defaultNow(),
});