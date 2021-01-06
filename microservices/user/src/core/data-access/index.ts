import { db } from "./admin";
import makeUserDb from "./user-db";

export function makeDb() {
    return db;
}

export const userDb = new makeUserDb(makeDb);