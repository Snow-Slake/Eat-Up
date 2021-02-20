import { CacheExceptionManager } from "./exception-interface";

export class ICacheExceptionManager implements CacheExceptionManager {
    setExceptionHandler(exception: string) : void {
        console.log('set data in cache throw exception: ' + exception);
    }
    delExceptionHandler(exception: string) : void {
        console.log('del data from cache throw exception: ' + exception);
    }
    getExceptionHandler(exception: string) : void{
        console.log('get data from cache throw exception: ' + exception);
    }
}