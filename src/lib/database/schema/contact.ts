import { pgTable, varchar, integer, timestamp, serial } from 'drizzle-orm/pg-core';

export const contact = pgTable('contact', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 128 }),
  email: varchar('email', { length: 256 }),
  phone: varchar('phone', { length: 64 }),
  subject: varchar('subject', { length: 256 }),
  message: varchar('message', { length: 1024 }),
  status: varchar('status', { length: 32 }).default('new'),
  admin_reply: varchar('admin_reply', { length: 1024 }),
  replied_at: timestamp('replied_at', { mode: 'string' }),
  replied_by: varchar('replied_by', { length: 128 }),
  created_at: timestamp('created_at', { mode: 'string' }).defaultNow(),
  updated_at: timestamp('updated_at', { mode: 'string' }).defaultNow(),
});
