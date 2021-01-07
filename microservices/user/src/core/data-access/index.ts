import makeFileManager from "./file-manager";
import makeFollowDb from "./follow-db";
import makeUserDb from "./user-db";

export { db } from "./admin";
export const userDb = new makeUserDb();
export const followDb = new makeFollowDb();
export const fileManager = new makeFileManager();
