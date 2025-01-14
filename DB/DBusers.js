﻿import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import { Configuration } from "../store/values/configuration";

export const checkExistsDB = async (dbName) => {
  const dbDir = FileSystem.documentDirectory + "SQLite/";
  const dirInfo = await FileSystem.getInfoAsync(dbDir + dbName);
  let exists;
  exists = !dirInfo.exists ? false : true;
  return exists;
};

export async function createDB(dbName) {
  const db = await SQLite.openDatabase(dbName);
  db.transaction((tx) => {
    tx.executeSql(`CREATE TABLE "users" (   
            "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            "comment" TEXT`);
  }),
    (error) => {
      console.log(`Error create: ${error.message}`);
    };
}

export async function select(dbName) {
  const db = await SQLite.openDatabase(dbName);
  db.transaction((tx) => {
    tx.executeSql(`SELECT * FROM users`, [], (_, { rows }) => {
      console.log(JSON.stringify(rows));
    });
  }),
    (error) => {
      console.log(`Error create select: ${error.message}`);
    };
}

export async function insert(dbName, comment) {
  const dirInfo = await checkExistsDB(dbName);
  if (!dirInfo) {
    await createDB(dbName);
  }
  const db = await SQLite.openDatabase(dbName);
  db.transaction((tx) => {
    tx.executeSql(`INSERT INTO users (comment) VALUES (?)`, [comment]);
  }),
    (error) => {
      console.log(`Error create insert: ${error.message}`);
    };
}

export async function deleteDB(dbName) {
  const dbDir = FileSystem.documentDirectory + "SQLite/";
  const dirInfo = await FileSystem.getInfoAsync(dbDir + dbName);
  if (dirInfo.exists) {
    await FileSystem.deleteAsync(dbDir + dbName, { idempotent: true });
  }
  db.transaction((tx) => {
    tx.executeSql(`DROP TABLE users`);
  }),
    (error) => {
      console.log(`Error create delete: ${error.message}`);
    };
}

export async function updateDB(dbName, id, comment = "") {
  const db = await SQLite.openDatabase(dbName);
  db.transaction((tx) => {
    tx.executeSql(`UPDATE users SET comment = ? WHERE id = ?`, [comment, id]);
  }),
  
    (error) => {
      console.log(`Error create update: ${error.message}`);
    };
}
