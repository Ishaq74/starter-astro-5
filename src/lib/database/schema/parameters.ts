import { pgTable, serial, varchar, timestamp } from 'drizzle-orm/pg-core';

export const parameters = pgTable('parameters', {
  id: serial('id').primaryKey(),
  key: varchar('key', { length: 128 }).notNull().unique(),
  value: varchar('value', { length: 2048 }).default(''),
  description: varchar('description', { length: 1024 }),
  category: varchar('category', { length: 128 }).notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
});
