import * as 'SQLite' from 'expo-sqlite';
import * as 'FileSystem' from 'expo-file-system';
import { Configuration } from '../store/values/configuration';


export const checkExistsDB = async (dbName) => {
    const dbDir = FileSystem.documentDirectory + 'SQLite/';
    const dirInfo = await FileSystem.getInfoAsync(dbDir + dbName);
    let exists;
    exists = !dirInfo.exists ? false : true;
    return exists;
}