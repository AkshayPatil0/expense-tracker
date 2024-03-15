import { SQLiteDatabase } from "expo-sqlite/next";
import { loadInitialData } from "./initial-data";

const dropTables = async (db: SQLiteDatabase) => {
  await db.execAsync(`
  DROP TABLE IF EXISTS categories;
  DROP TABLE IF EXISTS expenses;
  DROP TABLE IF EXISTS pendingExpenses;
  DROP TABLE IF EXISTS tags;
  DROP TABLE IF EXISTS tagsExpenses;
  DROP TABLE IF EXISTS config;
`);
};

const createTables = async (db: SQLiteDatabase) => {
  await db.execAsync(`
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY NOT NULL, 
    name TEXT NOT NULL,
    icon TEXT NOT NULL,
    parentId INTEGER,
    FOREIGN KEY(parentId) REFERENCES categories(id)
  );
  CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY NOT NULL, 
    amount DECIMAL(10, 2) NOT NULL, 
    date DATETIME, 
    note TEXT NOT NULL,
    categoryId INTEGER,
    FOREIGN KEY(categoryId) REFERENCES categories(id)
  );
  CREATE TABLE IF NOT EXISTS pendingExpenses (
    id INTEGER PRIMARY KEY NOT NULL, 
    amount DECIMAL(10, 2) NOT NULL, 
    date DATETIME, 
    paidTo TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS tags (
    id INTEGER PRIMARY KEY NOT NULL, 
    name TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS tagsExpenses (
    id INTEGER PRIMARY KEY NOT NULL,
    tagId INTEGER NOT NULL,
    expenseId INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS config (
    id INTEGER PRIMARY KEY NOT NULL, 
    key TEXT NOT NULL,
    value TEXT NOT NULL
  );
`);
};

const checkIfMigrationDone = async (db: SQLiteDatabase) => {
  try {
    const [result] = await db.getAllAsync<{ value: string }>(
      "SELECT value FROM config WHERE key = 'migration'"
    );

    return result.value === "true";
  } catch (err) {
    console.error("checkIfMigrationDone", err);
    return false;
  }
};
const markMigrationAsDone = async (db: SQLiteDatabase) => {
  const [result] = await db.getAllAsync<{ value: string }>(
    "INSERT INTO config (key, value) VALUES ('migration', 'true')"
  );
  return result.value === "true";
};

export const migrate = async (db: SQLiteDatabase) => {
  console.log("[Migration] Checking if migration is already done...");
  if (await checkIfMigrationDone(db)) return;

  console.log("[Migration] Staring migration...");
  await dropTables(db);
  console.log("[Migration] Dropped tables if exists.");
  await createTables(db);
  console.log("[Migration] Created tables.");
  await loadInitialData(db);
  console.log("[Migration] Loaded initial data.");
  await markMigrationAsDone(db);
  console.log("[Migration] Marked migration as done.");
};
