import { SQLDatabase } from 'encore.dev/storage/sqldb';

import { drizzle } from '@repo/database/db.edge';
import * as schema from '@repo/database/schema/schema';

const DB = new SQLDatabase('freelancing', {
  migrations: {
    path: './prisma/migrations',
    source: 'drizzle',
  },
});

// Configure WebSocket for Neon
const connectionString = DB.connectionString;

const orm = drizzle(connectionString, {
  schema,
});

export { orm };
