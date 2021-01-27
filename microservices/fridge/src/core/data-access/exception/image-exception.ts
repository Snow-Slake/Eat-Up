import { ImageException } from "./exception-interface";

export default class IImageException implements ImageException {
    uploadPublicFileException(exception: string): void {
        console.log('Upload image to storage throw exception: ' + exception);
    }
    uploadPrivateFileException(exception: string): void {
        /**
         * Here is your logic for exception func.
         */
        throw new Error("Method not implemented.");
    }
    deleteException(exception: string): void {
        console.log('Delete image from storage throw exception: ' + exception);
    }
    clearLocalFileException(exception: string): void {
        console.log('Clear local file throw exception: ' + exception);
    }
}