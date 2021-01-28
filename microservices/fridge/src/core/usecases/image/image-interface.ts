export interface ImageManager {
    uploadPublicFile(path: string, destination: string): Promise<string>;
    uploadPrivateFile(path: string, destination: string): Promise<string>;
    delete(destination: string): Promise<boolean>;
    clearLocalFile(path: string): Promise<void>;
}
