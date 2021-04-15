import { Post } from "../../entities/post";

export interface IPostDb {
    addPost(post: Post): Promise<boolean>;
    updatePost(post: Post): Promise<boolean>;
    deletePost(postId: string): Promise<boolean>;

}