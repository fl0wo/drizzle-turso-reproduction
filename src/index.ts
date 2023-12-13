import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client/http";
import * as schema from "./drizzle/schema";
export interface TursoDbEnv {
  TURSO_DB_AUTH_TOKEN?: string;
  TURSO_DB_URL?: string;
}

export function buildTursoClient(context?: TursoDbEnv) {
  const url = (context?.TURSO_DB_URL?.trim()) ?? (process.env.TURSO_DB_URL?.trim());
  if (!url) {
    throw new Error("TURSO_DB_URL is not defined");
  }
  const authToken = (context?.TURSO_DB_AUTH_TOKEN?.trim()) ?? (process.env.TURSO_DB_AUTH_TOKEN?.trim());
  if (!authToken) {
    throw new Error("TURSO_DB_AUTH_TOKEN is not defined");
  }

  return drizzle(createClient({ url, authToken }), {
    schema
  });
}
