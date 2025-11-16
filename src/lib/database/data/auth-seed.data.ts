// Seed data for authentication: users, organization, members (RBAC roles)
// Note: IDs are textual (UUID-like). For simplicity we use fixed strings; better-auth will create real accounts when users sign up.
// These are initial entries to enable role-based access immediately.

export const usersSeed = [
  {
    id: 'user-admin-0001',
    name: 'Admin Root',
    email: 'admin@example.com',
    email_verified: 1,
    image: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'user-editor-0001',
    name: 'Content Editor',
    email: 'editor@example.com',
    email_verified: 1,
    image: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
];

export const organizationsSeed = [
  {
    id: 'org-main-0001',
    name: 'Nirvana Studio',
    slug: 'nirvana',
    logo: null,
    created_at: new Date().toISOString(),
    metadata: null,
  }
];

export const membersSeed = [
  {
    id: 'member-admin-0001',
    organization_id: 'org-main-0001',
    user_id: 'user-admin-0001',
    role: 'admin',
    created_at: new Date().toISOString(),
  },
  {
    id: 'member-editor-0001',
    organization_id: 'org-main-0001',
    user_id: 'user-editor-0001',
    role: 'editor',
    created_at: new Date().toISOString(),
  }
];
