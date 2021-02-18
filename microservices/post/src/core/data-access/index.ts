import ICacheManager from "./cache-manager";
import { ICacheExceptionManager } from "./exception";
import { PostDb } from './post-db'

export const cache_manager = new ICacheManager(new ICacheExceptionManager);
export const postDb = new PostDb();