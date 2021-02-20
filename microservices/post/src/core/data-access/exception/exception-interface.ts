export interface CacheExceptionManager {
    setExceptionHandler(exception: string);
    delExceptionHandler(exception: string);
    getExceptionHandler(exception: string);
}