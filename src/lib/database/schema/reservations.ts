import { pgTable, varchar, integer, timestamp, index } from 'drizzle-orm/pg-core';
import { timeSlots } from './timeSlots';

export const reservations = pgTable('reservations', {
  // Use identity instead of serial to avoid introspection issues (T012)
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  name: varchar('name', { length: 128 }),
  email: varchar('email', { length: 256 }),
  phone: varchar('phone', { length: 64 }),
  service_type: varchar('service_type', { length: 64 }),
  service_name: varchar('service_name', { length: 128 }),
  preferred_date: varchar('preferred_date', { length: 32 }),
  preferred_time: varchar('preferred_time', { length: 32 }),
  message: varchar('message', { length: 1024 }),
  status: varchar('status', { length: 32 }).default('pending'),
  // New nullable foreign key to time_slots (T011)
  slot_id: integer('slot_id').references(() => timeSlots.id, { onDelete: 'set null' }),
  created_at: timestamp('created_at', { mode: 'string' }).defaultNow(),
  updated_at: timestamp('updated_at', { mode: 'string' }).defaultNow(),
}, (table) => ({
  reservationsSlotStatusIdx: index('reservations_slot_status_idx').on(table.slot_id, table.status),
}));
