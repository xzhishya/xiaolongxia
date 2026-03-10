import Database from 'better-sqlite3';
import fs from 'node:fs';
import path from 'node:path';

export function createDb() {
  const dataDir = path.resolve(process.cwd(), 'data');
  fs.mkdirSync(dataDir, { recursive: true });
  const db = new Database(path.join(dataDir, 'bridge.db'));

  db.exec(`
    CREATE TABLE IF NOT EXISTS session_map (
      key TEXT PRIMARY KEY,
      session_key TEXT NOT NULL,
      chat_type TEXT,
      user_open_id TEXT,
      chat_id TEXT,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS processed_events (
      event_id TEXT PRIMARY KEY,
      created_at TEXT NOT NULL
    );
  `);

  return {
    raw: db,
    hasProcessedEvent(eventId) {
      const row = db.prepare('SELECT event_id FROM processed_events WHERE event_id = ?').get(eventId);
      return Boolean(row);
    },
    markProcessedEvent(eventId) {
      db.prepare('INSERT OR IGNORE INTO processed_events (event_id, created_at) VALUES (?, ?)').run(eventId, new Date().toISOString());
    },
    getSession(key) {
      return db.prepare('SELECT * FROM session_map WHERE key = ?').get(key) || null;
    },
    setSession({ key, sessionKey, chatType, userOpenId, chatId }) {
      db.prepare(`
        INSERT INTO session_map (key, session_key, chat_type, user_open_id, chat_id, updated_at)
        VALUES (?, ?, ?, ?, ?, ?)
        ON CONFLICT(key) DO UPDATE SET
          session_key = excluded.session_key,
          chat_type = excluded.chat_type,
          user_open_id = excluded.user_open_id,
          chat_id = excluded.chat_id,
          updated_at = excluded.updated_at
      `).run(key, sessionKey, chatType || null, userOpenId || null, chatId || null, new Date().toISOString());
    },
  };
}
