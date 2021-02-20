import makeAddPostController from "./call-add-post";
import makeUpdatePostController from "./call-update-post";
import makeDeletePostController from "./call-delete-post";
import PostControllerException from "./exception/controller-imp";
import { addPost, updatePost, deletePost } from "../core/usecases";

export const addPostController = makeAddPostController(new PostControllerException(), {
    addPost,
});

export const updatePostController = makeUpdatePostController(new PostControllerException(), {
    updatePost,
});

export const deletePostController = makeDeletePostController(new PostControllerException(), {
    deletePost,
});
