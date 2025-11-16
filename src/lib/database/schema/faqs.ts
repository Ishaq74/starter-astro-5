import { pgTable, varchar, integer, timestamp, serial } from 'drizzle-orm/pg-core';

export const faqs = pgTable('faqs', {
  id: serial('id').primaryKey(),
  question: varchar('question', { length: 256 }).notNull(),
  answer: varchar('answer', { length: 512 }).notNull(),
  category: varchar('category', { length: 64 }).default('general'),
  sort_order: integer('sort_order').default(0),
  is_active: integer('is_active').default(1),
  created_at: timestamp('created_at', { mode: 'string' }).defaultNow(),
  updated_at: timestamp('updated_at', { mode: 'string' }).defaultNow(),
});