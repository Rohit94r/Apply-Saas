import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@/packages/db/schema";

type DbClient = ReturnType<typeof drizzle<typeof schema>>;

declare global {
  // eslint-disable-next-line no-var
  var __applyDb: DbClient | undefined;
}

function createDb(): DbClient {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL is not configured. Add a Neon Postgres connection string to .env.local."
    );
  }

  const sql = neon(databaseUrl);
  return drizzle(sql, { schema });
}

/** Neon HTTP + Drizzle client (cached across hot reloads in Next.js). */
export function getDb(): DbClient {
  if (!global.__applyDb) {
    global.__applyDb = createDb();
  }
  return global.__applyDb;
}

export const db = new Proxy({} as DbClient, {
  get(_target, prop, receiver) {
    return Reflect.get(getDb(), prop, receiver);
  }
});

export async function assertDatabaseReady() {
  getDb();
}

export type { DbClient };
