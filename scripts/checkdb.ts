import { getPgClient } from '@/lib/database/drizzle';

(async () => {
  const client = getPgClient();
  try {
    await client.connect();
    const res = await client.query('SELECT current_database(), current_user, inet_server_addr() as host');
    // Détection par USE_PROD_DB
    const useProd = process.env.USE_PROD_DB === 'true';
    const env = useProd ? 'production (Neon)' : 'local/dev';
    const envFile = '.env';
    console.log('Connexion OK !');
    console.log('ENV détecté :', env, '| Fichier chargé :', envFile);
    console.table(res.rows);
  } catch (e) {
    console.error('Erreur de connexion à la base :', e);
    process.exit(1);
  } finally {
    await client.end();
  }
})();
