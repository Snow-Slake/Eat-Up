import makeAddUser from "./user/add-user";
import makeUpdateUser from "./user/update-user";
import makeDeleteUser from "./user/delete-user";
import makeGetUser from "./user/get-user";
import { userDb, followDb, fileManager } from "../data-access";
import makeAddFollow from "./follow/add-follow";
import makeDeleteFollow from "./follow/delete-follow";
import makeGetFollow from "./follow/get-follow";
import makeClearFollow from "./follow/clear-follow-doc";
import makeFollow from "./follow/follow-user";
import makeUnfollow from "./follow/unfollow-user";
import makeAddFile from "./file/insert-doc";
import makeDeleteFile from "./file/delete-doc";
import makeGetFile from "./file/get-doc";

//---------------------------------Interfaces---------------------------------------//
export { UserDb } from "./user/user-db-interface";
export { FileManager } from "./file/file-interface";
export { FollowDb } from "./follow/follow-db-interface";
//---------------------------------User Factory Call---------------------------------//
export const addUser = makeAddUser(userDb);
export const updateUser = makeUpdateUser(userDb);
export const deleteUser = makeDeleteUser(userDb);
export const getUser = makeGetUser(userDb);

//---------------------------------Follow Factory Call---------------------------------//
export const addFollow = makeAddFollow(followDb);
export const deleteFollow = makeDeleteFollow(followDb);
export const getFollow = makeGetFollow(followDb);
export const clearFollow = makeClearFollow(followDb);
export const follow = makeFollow(followDb);
export const unFollow = makeUnfollow(followDb);

//---------------------------------User Factory Call---------------------------------//
export const addFile = makeAddFile(fileManager);
export const deleteFile = makeDeleteFile(fileManager);
export const getFile = makeGetFile(fileManager);
