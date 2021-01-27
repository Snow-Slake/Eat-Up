export interface ImageException {
    uploadPublicFileException(exception: string): void;
    uploadPrivateFileException(exception: string): void;
    deleteException(exception: string): void;
    clearLocalFileException(exception: string): void;
}

export interface FridgeException {
    insertFridgeException(exception: string): void;
    updateFridgeException(exception: string): void;
    deleteFridgeException(exception: string): void;
    getFridgeException(exception: string): void;
}