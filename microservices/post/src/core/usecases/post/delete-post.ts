import { makePost } from "../../entities";
import CacheManager from "../cache/cache-interface";
import { IPostDb } from "./post-interface";

export default function makeDeletePost(post_db: IPostDb, cache: CacheManager) {
    return async function deletePost(
        id: string,
    ): Promise<boolean> {
        await cache.del(id);
        return await post_db.deletePost(id);
    };
}
