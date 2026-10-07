import type Database from "better-sqlite3";
import type {
  RepositoryBundle,
  UserRepository,
  WaitlistRepository,
} from "@/database/contracts";
import type {
  StaffLoginRecord,
  StaffUser,
  UserRole,
  WaitlistEntry,
} from "@/database/types";

function createUserRepository(database: Database.Database): UserRepository {
  return {
    findRoleByUsername(username): UserRole | undefined {
      const user = database
        .prepare("SELECT role FROM users WHERE username = ? COLLATE NOCASE")
        .get(username) as { role: UserRole } | undefined;
      return user?.role;
    },

    findStaffByUsername(username): StaffLoginRecord | undefined {
      return database
        .prepare(
          `SELECT id, name, username, role, password_hash AS passwordHash
           FROM users
           WHERE username = ? COLLATE NOCASE AND role = 'staff'`,
        )
        .get(username) as StaffLoginRecord | undefined;
    },

    findStaffById(id): StaffUser | undefined {
      return database
        .prepare(
          "SELECT id, name, username, role FROM users WHERE id = ? AND role = 'staff'",
        )
        .get(id) as StaffUser | undefined;
    },

    createStaff({ name, username, passwordHash }): void {
      database
        .prepare(
          `INSERT INTO users (name, username, password_hash, role)
           VALUES (?, ?, ?, 'staff')
           ON CONFLICT(username) DO NOTHING`,
        )
        .run(name, username, passwordHash);
    },
  };
}

function createWaitlistRepository(
  database: Database.Database,
): WaitlistRepository {
  const listEntryQuery = `SELECT waitlist.ticket, users.name,
                                 waitlist.party_size AS partySize,
                                 waitlist.created_at AS createdAt
                          FROM waitlist
                          JOIN users ON users.id = waitlist.user_id`;

  return {
    registerEntry(name, partySize): number {
      const addEntry = database.transaction(() => {
        const customer = database
          .prepare("INSERT INTO users (name, role) VALUES (?, 'customer')")
          .run(name);
        const entry = database
          .prepare("INSERT INTO waitlist (user_id, party_size) VALUES (?, ?)")
          .run(customer.lastInsertRowid, partySize);

        return Number(entry.lastInsertRowid);
      });
      return addEntry();
    },

    findEntry(ticket): WaitlistEntry | undefined {
      return database
        .prepare(`${listEntryQuery} WHERE waitlist.ticket = ?`)
        .get(ticket) as WaitlistEntry | undefined;
    },

    countPartiesAhead(ticket): number | null {
      const result = database
        .prepare(
          `SELECT
             (SELECT COUNT(*) FROM waitlist AS earlier
              WHERE earlier.ticket < current.ticket) AS ahead
           FROM waitlist AS current
           WHERE current.ticket = ?`,
        )
        .get(ticket) as { ahead: number } | undefined;
      return result?.ahead ?? null;
    },

    listEntries(): WaitlistEntry[] {
      return database
        .prepare(`${listEntryQuery} ORDER BY waitlist.ticket ASC`)
        .all() as WaitlistEntry[];
    },
  };
}

export function createSqliteRepositories(
  database: Database.Database,
): RepositoryBundle {
  return {
    users: createUserRepository(database),
    waitlist: createWaitlistRepository(database),
  };
}
