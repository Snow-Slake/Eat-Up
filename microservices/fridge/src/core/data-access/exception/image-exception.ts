import { ImageException } from "./exception-interface";

export default class IImageException implements ImageException {
    uploadException(exception: string): void {
        console.log('Upload image to storage throw exception: ' + exception);
    }
    deleteException(exception: string): void {
        console.log('Delete image from storage throw exception: ' + exception);
    }
}