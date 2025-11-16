import { pgTable, varchar, integer, serial } from 'drizzle-orm/pg-core';

export const teamMembers = pgTable('team_members', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 64 }).unique(),
  name: varchar('name', { length: 128 }),
  role: varchar('role', { length: 128 }),
  speciality: varchar('speciality', { length: 128 }),
  image_path: varchar('image_path', { length: 256 }),
  experience: varchar('experience', { length: 64 }),
  description: varchar('description', { length: 512 }),
  certifications: varchar('certifications', { length: 256 }),
  achievements: varchar('achievements', { length: 256 }),
  social_instagram: varchar('social_instagram', { length: 128 }),
  social_linkedin: varchar('social_linkedin', { length: 128 }),
  social_email: varchar('social_email', { length: 128 }),
  sort_order: integer('sort_order'),
});