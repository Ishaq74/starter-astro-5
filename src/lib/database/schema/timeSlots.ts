import { pgTable, varchar, integer, timestamp } from 'drizzle-orm/pg-core';

export const timeSlots = pgTable('time_slots', {
  // Use identity instead of serial to avoid introspection issues (T012)
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  date: varchar('date', { length: 32 }).notNull(),
  startTime: varchar('start_time', { length: 16 }).notNull(),
  endTime: varchar('end_time', { length: 16 }).notNull(),
  serviceType: varchar('service_type', { length: 64 }),
  notes: varchar('notes', { length: 512 }),
  isAvailable: integer('is_available').default(1),
  // reserved_by is deprecated in favor of reservations.slot_id (T014)
  reservedBy: varchar('reserved_by', { length: 128 }).default('') /* @deprecated */,
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
});
