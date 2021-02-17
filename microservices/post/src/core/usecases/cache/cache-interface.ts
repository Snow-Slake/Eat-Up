export default interface CacheManager {
    set(key: string, value: JSON) : Promise<boolean>;
    get(key: string) : Promise<JSON>;
}