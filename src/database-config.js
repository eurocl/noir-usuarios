export function databaseConfig(env = process.env) {
  if (!env.DATABASE_URL) throw new Error('Falta DATABASE_URL: configurar el clúster exclusivo de noir-usuarios');
  if (env.DATABASE_NAME !== 'noir_usuarios') throw new Error('DATABASE_NAME debe ser noir_usuarios');
  let uri;
  try { uri = new URL(env.DATABASE_URL); } catch { throw new Error('DATABASE_URL inválida'); }
  if (!['mongodb:', 'mongodb+srv:'].includes(uri.protocol)) throw new Error('DATABASE_URL debe ser una conexión MongoDB');
  if (!uri.hostname) throw new Error('Falta el servidor MongoDB');
  return { uri: env.DATABASE_URL, dbName: env.DATABASE_NAME };
}
