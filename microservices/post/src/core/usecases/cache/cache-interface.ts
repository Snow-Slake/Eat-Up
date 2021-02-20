import { Post } from "../../entities/post";

export default interface CacheManager {
    set(key: string, value: Post) : Promise<boolean>;
    del(key: string) : Promise<boolean>;
    get(key: string) : Promise<Post>;
}