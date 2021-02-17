export interface CacheExceptionManager {
    setExceptionHandler(exception: string);
    getExceptionHandler(exception: string);
}