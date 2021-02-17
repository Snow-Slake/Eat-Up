import { cache_server } from "../../config";
import CacheManager from "../usecases/cache/cache-interface";
import { CacheExceptionManager } from "./exception";
import fetch from 'node-fetch';

export default class ICacheManager implements CacheManager {
    constructor(private _cache_exception_manager: CacheExceptionManager) {}
    async set(key: string, value: any): Promise<boolean> {
        try {
            await fetch(cache_server, {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    key: key,
                    value: value,
                }),
            });
            return true;
        } catch (exception) {
            this._cache_exception_manager.setExceptionHandler(exception);
        }
        return false;
    }
    async get(key: string): Promise<any> {
        try {
            let response = await fetch(cache_server, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    key: key
                }),
            });
            let res = await response
            .json();

            return res.value;
        } catch (exception) {
            this._cache_exception_manager.getExceptionHandler(exception);
        }
        return null as any;
    }
}
