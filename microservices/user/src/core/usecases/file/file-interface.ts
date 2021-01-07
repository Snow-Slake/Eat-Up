export interface FileManager {
    insert(key: string, value: string): Promise<boolean>;
    delete(key: string): Promise<boolean>;
    get(key: string): Promise<string>;
}