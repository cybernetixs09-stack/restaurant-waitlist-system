CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  username TEXT COLLATE NOCASE UNIQUE,
  password_hash TEXT,
  role TEXT NOT NULL CHECK (role IN ('staff', 'customer')),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CHECK (
    (role = 'staff' AND username IS NOT NULL AND password_hash IS NOT NULL)
    OR (role = 'customer' AND username IS NULL AND password_hash IS NULL)
  )
);

CREATE TABLE IF NOT EXISTS waitlist (
  ticket INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id),
  party_size INTEGER NOT NULL
    CHECK (typeof(party_size) = 'integer' AND party_size > 0),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
