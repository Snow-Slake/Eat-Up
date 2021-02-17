import ICacheManager from "./cache-manager";
import { ICacheExceptionManager } from "./exception";

export const cache_manager = new ICacheManager(new ICacheExceptionManager);