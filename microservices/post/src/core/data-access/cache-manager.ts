import { cache_server } from "../../config";
import CacheManager from "../usecases/cache/cache-interface";
import { CacheExceptionManager } from "./exception";

export default class ICacheManager implements CacheManager {
    constructor (
        private _cache_exception_manager: CacheExceptionManager,
    ) {}
    async set(key: string, value: JSON): Promise<boolean> {
        try {
            await fetch(cache_server, {
                method: "put",
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
    get(key: string): Promise<JSON> {
        try {
            fetch(cache_server, {
                method: "get",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    key: key,
                }),
            }).then((res) => {
                res.json().then(async (data) => {
                    if (data.value.length > 0) {
                        return data.value;
                    }
                });
            });
        } catch (exception) {
            this._cache_exception_manager.getExceptionHandler(exception);
        }
        return null as any;
    }
}
