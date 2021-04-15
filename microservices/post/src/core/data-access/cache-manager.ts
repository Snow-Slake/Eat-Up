import { cache_local_server, cache_server, delete_ref } from "../../config";
import CacheManager from "../usecases/cache/cache-interface";
import { CacheExceptionManager } from "./exception";
import fetch from "node-fetch";
import { Post } from "../entities/post";

export default class ICacheManager implements CacheManager {
    constructor(private _cache_exception_manager: CacheExceptionManager) {}
    async set(key: string, value: Post): Promise<boolean> {
        try {
            let response = await fetch(cache_local_server, {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    key: key,
                    value: this.toJson(value),
                }),
            });
            let res = await response.json();
            
            if (response.status == 500) {
                this._cache_exception_manager.setExceptionHandler(res.message);
                return false;
            }
            return true;
        } catch (exception) {
            this._cache_exception_manager.setExceptionHandler(exception);
        }
        return false;
    }
    async del(key: string): Promise<boolean> {
        try {
            let response = await fetch(cache_local_server + delete_ref, {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    key: key,
                }),
            });
            let res = await response.json();
            
            if (response.status == 500) {
                this._cache_exception_manager.delExceptionHandler(res.message);
                return false;
            }
            return true;
        } catch (exception) {
            this._cache_exception_manager.delExceptionHandler(exception);
        }
        return false;
    }
    async get(key: string): Promise<Post> {
        try {
            let response = await fetch(cache_local_server, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    key: key,
                }),
            });
            let res = await response.json();

            if (res.value != null) {
                return this.fromJson(res.value);
            }
            if (response.status == 500) {
                this._cache_exception_manager.getExceptionHandler(res.message);
            }
            return null as any;
        } catch (exception) {
            this._cache_exception_manager.getExceptionHandler(exception);
        }
        return null as any;
    }

    private toJson(post: Post) {
        return {
            id: post.id,
            userId: post.userId,
            createdAt: post.createdAt.toString(),
            tags: post.tags,
            imagesLinks: post.imagesLinks,
            videoLink: post.videoLink,
            description: post.description,
            price: post.price,
            reacts: post.reacts,
            postContent: post.postContent
                ? {
                      ingredients: post.postContent.ingredients,
                      nutritions: post.postContent.nutritions,
                      steps: post.postContent.steps,
                  }
                : {},
        };
    }

    private fromJson(post: any): Post {
        const current_post = new Post(
            post.id,
            post.userId,
            post.description,
            new Date(post.createdAt),
            post.tags,
            post.imagesLinks,
            post.videoLink,
            post.price,
            post.reacts,
            post.postContent ? post.postContent : {}
        );

        return current_post;
    }
}
