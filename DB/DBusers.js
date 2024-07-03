import * as SQLite from "expo-sqlite";
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
      console.log(error);
    };
}
