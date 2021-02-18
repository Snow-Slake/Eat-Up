import { Post } from "./post";

export function buildMakePost() {
    return function(
        id: string,
        userId: string,
        description: string,
        tags: string[],
        imagesLinks: string[],
        videoLink: string,
        price: number,
        postContent?: {ingredients: string[], nutritions: string[], steps: string[]}): Post{
        const createdAt = new Date();
        const reacts = [];
        const _postContent = postContent? { ...postContent } : undefined;
        const post = new Post(id, userId, description, createdAt, tags.slice(0), imagesLinks.slice(0), 
                            videoLink, price, reacts, _postContent);
        return post;
    }
}