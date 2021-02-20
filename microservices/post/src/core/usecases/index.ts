import { postDb } from "../data-access";
import makeAddPost from "./post/add-post";
import makeDeletePost from "./post/delete-post";
import makeUpdatePost from "./post/update-post";

export const addPost = makeAddPost(postDb);
export const updatePost = makeUpdatePost(postDb);
export const deletePost = makeDeletePost(postDb);
