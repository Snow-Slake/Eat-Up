import { makePost } from "../../entities";
import { IPostDb } from "./post-interface";

export default function makeUpdatePost(post_db: IPostDb) {
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

        return await post_db.updatePost(current_post);
    };
}
