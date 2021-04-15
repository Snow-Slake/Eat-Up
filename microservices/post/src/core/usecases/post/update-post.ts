import ICacheManager from "../../data-access/cache-manager";
import { makePost } from "../../entities";
import { IPostDb } from "./post-interface";

export default function makeUpdatePost(post_db: IPostDb, cache_db: ICacheManager) {
    return async function updatePost(
        id: string,
        userId: string,
        description: string,
        tags: string[],
        imagesLinks: string[],
        videoLink: string,
        price: number,
        ingredients: string[],
        nutritions: string[],
        steps: string[]
    ): Promise<boolean> {
        const current_post = makePost(
            id,
            userId,
            description,
            tags,
            imagesLinks,
            videoLink,
            price,
            {
                ingredients,
                nutritions,
                steps,
            }
        );
        let is_update = await post_db.updatePost(current_post);
        if (is_update) {
            await cache_db.set(current_post.id, current_post);
        }
        return is_update;
    };
}
