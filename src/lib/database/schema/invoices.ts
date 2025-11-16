import { pgTable, serial, integer, varchar, timestamp, numeric } from 'drizzle-orm/pg-core';
import { reservations } from './reservations';
import { relations } from 'drizzle-orm';

export const invoices = pgTable('invoices', {
  id: serial('id').primaryKey(),
  reservationId: integer('reservation_id').references(() => reservations.id, { onDelete: 'set null' }),
  invoiceNumber: varchar('invoice_number', { length: 64 }).notNull().unique(),
  customerName: varchar('customer_name', { length: 128 }).notNull(),
  customerEmail: varchar('customer_email', { length: 256 }).notNull(),
  serviceName: varchar('service_name', { length: 128 }).notNull(),
  amount: numeric('amount').notNull(),
  dueDate: timestamp('due_date', { mode: 'string' }),
  status: varchar('status', { length: 32 }).default('pending'),
  paidAmount: numeric('paid_amount'),
  paymentMethod: varchar('payment_method', { length: 64 }),
  paymentIntentId: varchar('payment_intent_id', { length: 128 }),
  notes: varchar('notes', { length: 1024 }),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
});

export const invoicesRelations = relations(invoices, ({ one }) => ({
  reservation: one(reservations, {
    fields: [invoices.reservationId],
    references: [reservations.id],
  }),
}));
