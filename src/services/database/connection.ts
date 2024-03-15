import * as SQLite from "expo-sqlite/next";
import { migrate } from "./migration";

let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;

export const getDb = (): Promise<SQLite.SQLiteDatabase> => {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise(async (resolve, reject) => {
    try {
      const db = await SQLite.openDatabaseAsync("expense-tracker");
      await migrate(db);
      resolve(db);
    } catch (err) {
      console.error("getDb -> ", err);
      reject(err);
    }
  });

  return dbPromise;
};
