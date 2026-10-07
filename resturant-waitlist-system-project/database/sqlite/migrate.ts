import type Database from "better-sqlite3";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

export function applySqliteMigrations(database: Database.Database): void {
  database.exec(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      name TEXT PRIMARY KEY,
      applied_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  const migrationDirectory = join(
    process.cwd(),
    "database",
    "migrations",
    "sqlite",
  );
  const migrations = readdirSync(migrationDirectory)
    .filter((filename) => filename.endsWith(".sql"))
    .sort();
  const hasMigration = database.prepare(
    "SELECT 1 FROM schema_migrations WHERE name = ?",
  );
  const recordMigration = database.prepare(
    "INSERT INTO schema_migrations (name) VALUES (?)",
  );

  for (const name of migrations) {
    const sql = readFileSync(join(migrationDirectory, name), "utf8");
    const applyMigration = database.transaction(() => {
      if (hasMigration.get(name)) {
        return;
      }
      database.exec(sql);
      recordMigration.run(name);
    });
    applyMigration.immediate();
  }
}
