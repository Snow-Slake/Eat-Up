export interface FridgeControllerException {
    insertException(exception: string): void;
    updateException(exception: string): void;
    deleteException(exception: string): void;
    getException(exception: string): void;
}