export default interface CacheManager {
    set(key: string, value: any) : Promise<boolean>;
    del(key: string) : Promise<boolean>;
    get(key: string) : Promise<any>;
}