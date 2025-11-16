import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { organization, admin, customSession } from "better-auth/plugins";
import { getPgClient, getDrizzle } from "@/lib/database/drizzle";
import { member } from "@/lib/database/schema/auth-schema";
import { eq } from 'drizzle-orm';

// Centralized auth instance with organization + admin plugin enabled.
// Admin plugin integrates role management; we map member.role for RBAC.
// Low-level pg client for adapter
const client = getPgClient();

export const auth = betterAuth({
    database: drizzleAdapter(client, { provider: "pg" }),
    emailAndPassword: { enabled: true },
        plugins: [
            organization(),
            admin(),
            customSession(async ({ user }) => {
                const db = await getDrizzle();
                if (!db) {
                    // If DB isn't ready, fall back to minimal session
                    return { user: { ...user, primaryRole: 'member' }, roles: ['member'] };
                }
                const rolesRows = await db
                    .select({ role: member.role })
                    .from(member)
                    .where(eq(member.userId, user.id));
                const roles = rolesRows.map(r => r.role);
                return {
                    user: { ...user, primaryRole: roles[0] || 'member' },
                    roles,
                };
            })
        ],
    audit: { enabled: true },
    session: {
        // Default expiry (7d). Adjust RBAC freshness with customSession.
        expiresIn: 60 * 60 * 24 * 7,
        updateAge: 60 * 60 * 24,
        freshAge: 60 * 10,
    },
});

// Shared helper (used by admin APIs) to require a session and optionally an admin role.
export async function requireSession(headers: Headers, opts?: { role?: 'admin' | 'editor' | 'member'; }) {
    const session = await auth.api.getSession({ headers });
    if (!session) return null;
    if (!opts?.role) return session;
    const role = (session.user as any)?.primaryRole || 'member';
    if (opts.role === 'admin' && role !== 'admin') return null;
    if (opts.role === 'editor' && !['editor','admin'].includes(role)) return null;
    return session;
}