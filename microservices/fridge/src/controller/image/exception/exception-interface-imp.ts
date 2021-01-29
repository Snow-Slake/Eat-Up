import { FileControllerException } from "./exception-interface";

export default class IFileControllerException implements FileControllerException {
    updatePublicException(exception: string): void {
        console.log('Upload public file throw exception: ' + exception);
    }
    deleteException(exception: string): void {
        console.log('Delete file throw exception: ' + exception);
    }
}