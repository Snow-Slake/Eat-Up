import ICacheManager from "../../data-access/cache-manager";
import { IPostDb } from "./post-interface";

export default function makeDeletePost(post_db: IPostDb, cache_db: ICacheManager) {
    return async function deletePost(
        id: string,
    ): Promise<boolean> {
        let is_delete = await post_db.deletePost(id);
        if (is_delete) {
            await cache_db.del(id);
        }
        return is_delete;
    };
}
