import { config } from 'dotenv';
import { spawnSync } from 'child_process';
import path from 'path';
import { Pool } from 'pg';

config({ path: path.resolve(process.cwd(), '.env') });
const useProd = process.env.USE_PROD_DB === 'true';
const configFile = useProd ? 'drizzle-prod.config.ts' : 'drizzle-dev.config.ts';

console.log(`Running migration with ${configFile}...`);
const result = spawnSync('npx', ['drizzle-kit', 'push', `--config=${configFile}`], { stdio: 'inherit', shell: true });

if (result.status === 0) {
	process.exit(0);
}

// Fallback path for environments where drizzle introspection fails on 'serial' regtype (code 42704)
console.warn('[migrate] drizzle push failed, attempting fallback SQL migration for slot_id + index...');

async function fallbackMigration() {
	const url = process.env.USE_PROD_DB === 'true' ? process.env.DATABASE_URL_PROD! : process.env.DATABASE_URL_LOCAL!;
	if (!url) {
		throw new Error('DATABASE_URL not configured');
	}
	const pool = new Pool({ connectionString: url });
	try {
		// Ensure tables exist before altering; if not present, skip without failing hard
		const client = await pool.connect();
		try {
			await client.query('BEGIN');
			await client.query(`
				DO $$ BEGIN
					IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name='reservations') THEN
						ALTER TABLE reservations ADD COLUMN IF NOT EXISTS slot_id integer;
						ALTER TABLE reservations
							DROP CONSTRAINT IF EXISTS reservations_slot_id_fkey,
							ADD CONSTRAINT reservations_slot_id_fkey FOREIGN KEY (slot_id)
							REFERENCES time_slots(id) ON DELETE SET NULL;
						CREATE INDEX IF NOT EXISTS reservations_slot_status_idx ON reservations (slot_id, status);
					END IF;
				END $$;
			`);
			await client.query('COMMIT');
			console.log('[migrate] Fallback migration applied successfully.');
		} catch (e) {
			await client.query('ROLLBACK');
			throw e;
		} finally {
			client.release();
		}
	} finally {
		await pool.end();
	}
}

fallbackMigration()
	.then(() => process.exit(0))
	.catch((err) => {
		console.error('[migrate] Fallback migration failed:', err);
		process.exit(result.status ?? 1);
	});
