import { loadEnvironment, startApi } from './src/runtime.js';
import { createUsersApp } from './src/app.js';
import { databaseConfig } from './src/database-config.js';
loadEnvironment();
try {
  await startApi(createUsersApp(), { name: 'noir-usuarios', port: 3001, requireJwt: true, requireInternalSecret: false, dependencies: [], ...databaseConfig() });
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
