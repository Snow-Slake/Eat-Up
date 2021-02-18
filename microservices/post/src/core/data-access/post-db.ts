import { Post } from "../entities/post";
import { IPostDb } from "./ipost-db";
import { db } from './admin'
import { DB } from '../../config'
import { cache_manager } from ".";

export class PostDb implements IPostDb {
    async addPost(post: Post): Promise<boolean> {
        try {
            const batch = db.batch();
            const postWithoutContent = this.getPostWithoutContent(post);
            const postRef = db.collection(DB.POST_COLLECTION_NAME).doc(post.id);
            batch.set(postRef, postWithoutContent)

            if(post.postContent) {
                const postContent = this.getPostContent(post); 
                const postContentRef = db.collection(DB.POST_CONTENT_COLLECTION_NAME).doc(post.id);
                batch.set(postContentRef, postContent)
            }

            await batch.commit();
            return true
        }
        catch(err) {
            return false;
        }
    }

    async updatePost(post: Post): Promise<boolean> {
        try {
            const batch = db.batch();
            const postWithoutContent = this.getPostWithoutContent(post);
            const postRef = db.collection(DB.POST_COLLECTION_NAME).doc(post.id);
            batch.update(postRef, postWithoutContent)

            if(post.postContent) {
                const postContent = this.getPostContent(post); 
                const postContentRef = db.collection(DB.POST_CONTENT_COLLECTION_NAME).doc(post.id);
                batch.update(postContentRef, postContent)
            }

            await batch.commit();
            cache_manager.set(post.id, post);
            return true
        }
        catch(err) {
            return false;
        }
    }

    async deletePost(postId: string): Promise<boolean> {
        try {
            const batch = db.batch();
            const postRef = db.collection(DB.POST_COLLECTION_NAME).doc(postId);
            batch.delete(postRef)

            const postContentRef = db.collection(DB.POST_CONTENT_COLLECTION_NAME).doc(postId);
            batch.delete(postContentRef)

            await batch.commit();
            cache_manager.set(postId, null);
            return true
        }
        catch(err) {
            return false;
        }
    }

    private getPostWithoutContent(post: Post) {
        return {
            userId: post.userId,
            createdAt: post.createdAt,
            tags: post.tags,
            imagesLinks: post.imagesLinks,
            videoLink: post.videoLink,
            description: post.description,
            price: post.price,
            reacts: post.reacts,
        }
    }

    private getPostContent(post: Post) {
        return post.postContent? {
            ingredients: post.postContent.ingredients,
            nutritions: post.postContent.nutritions,
            steps: post.postContent.steps
        } : {};
    }
}