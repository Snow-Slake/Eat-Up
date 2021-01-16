export interface ImageException {
    uploadException(exception: string): void;
    deleteException(exception: string): void;
}