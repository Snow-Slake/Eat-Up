import { IPostDb } from "./post-interface";

export default function makeDeletePost(post_db: IPostDb) {
    return async function deletePost(
        id: string,
    ): Promise<boolean> {
        return await post_db.deletePost(id);
    };
}
