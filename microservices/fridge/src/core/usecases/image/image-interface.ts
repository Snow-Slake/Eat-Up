export interface ImageManager {
    upload(path: string, file: File): Promise<string>;
    delete(path: string): Promise<boolean>;
}