export default interface CacheManager {
    set(key: string, value: any) : Promise<boolean>;
    get(key: string) : Promise<any>;
}