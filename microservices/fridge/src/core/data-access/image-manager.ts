import { ImageManager } from "../usecases/image/image-interface";
import { storage } from "./admin";
import { ImageException } from "./exception/exception-interface";

export default class IImageManager implements ImageManager {
    constructor(private _image_exception: ImageException) {}
    async upload(path: string, file: File): Promise<string> {
        try {
            let storageReference = storage.child(path).put(file);

            return await storageReference.snapshot.ref.getDownloadURL();
        } catch (exception) {
            this._image_exception.uploadException(exception);
            return null as any;
        }
    }
    async delete(path: string): Promise<boolean> {
        try {
            let storageReference = storage.child(path);

            await storageReference.delete();
            return true;
        } catch (exception) {
            this._image_exception.deleteException(exception);
            return false;
        }
    }
}
