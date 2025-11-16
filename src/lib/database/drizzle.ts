import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client, Pool } from 'pg';
import type { PoolClient } from 'pg';

config();

// Utilise DATABASE_URL si défini, sinon fallback sur USE_PROD_DB
const url = process.env.DATABASE_URL
  || (process.env.USE_PROD_DB === 'true'
    ? process.env.DATABASE_URL_PROD
    : process.env.DATABASE_URL_LOCAL);

if (!url) throw new Error('DATABASE_URL manquant');

export function getPgClient() {
  return new Client({
    connectionString: url,
    ssl: url && url.includes('sslmode=require') ? { rejectUnauthorized: false } : undefined,
  });
}

let cachedDrizzle: ReturnType<typeof drizzle> | null = null;
let connecting: Promise<ReturnType<typeof drizzle>> | null = null;

export async function getDrizzle() {
  if (cachedDrizzle) return cachedDrizzle;
  if (connecting) return connecting;

  connecting = (async () => {
    const pool = new Pool({
      connectionString: url,
      ssl: url && url.includes('sslmode=require') ? { rejectUnauthorized: false } : undefined,
      max: 5,
      idleTimeoutMillis: 10000,
    });

    // Establish initial connection with timeout (5s) to surface creds issues early
    const timeoutMs = 5000;
    const client: PoolClient = await Promise.race([
      pool.connect(),
      new Promise<PoolClient>((_, reject) => setTimeout(() => reject(new Error('Timeout connexion PG (>5s)')), timeoutMs)),
    ]);
    // Release immediately; drizzle will manage pool
    client.release();

    cachedDrizzle = drizzle(pool);
    return cachedDrizzle;
  })();

  try {
    return await connecting;
  } catch (e) {
    connecting = null;
    console.warn('[drizzle] échec connexion:', (e as any)?.message);
    throw e;
  }
}
