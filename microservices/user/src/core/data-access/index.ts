import makeFileManager from "./file-manager";
import makeFollowDb from "./follow-db";
import makeUserDb from "./user-db";
import { IUserDbException } from "./exception/userDb-exception-imp";
import { IFollowDbException } from "./exception/followDb-exception-imp";
import { IFileException } from "./exception/file-exception-imp";
import TokenManager from "./token-manager";
import ITokenException from "./exception/token-exception-imp";

export { db } from "./admin";
export const userDb = new makeUserDb(new IUserDbException());
export const followDb = new makeFollowDb(new IFollowDbException());
export const fileManager = new makeFileManager(new IFileException());
export const tokenManager = new TokenManager(new ITokenException());
