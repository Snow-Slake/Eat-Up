import { cache_manager, postDb } from "../data-access";
import makeAddPost from "./post/add-post";
import makeDeletePost from "./post/delete-post";
import makeUpdatePost from "./post/update-post";

export const addPost = makeAddPost(postDb, cache_manager);
export const updatePost = makeUpdatePost(postDb, cache_manager);
export const deletePost = makeDeletePost(postDb, cache_manager);
