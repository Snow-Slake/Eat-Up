import fs from "fs";
import { ImageManager } from "../usecases/image/image-interface";
import { bucket } from "./admin";
import { ImageException } from "./exception/exception-interface";
import * as uuid from "uuid";
import { DB_CONFIG } from "../../config";

export default class IImageManager implements ImageManager {
    constructor(private _image_exception: ImageException) {}
    async uploadPublicFile(
        path: string,
        destination: string
    ): Promise<string> {
        try {
            await bucket.upload(path, {
                gzip: true,
                destination: destination,
                metadata: {
                    metadata: {
                        firebaseStorageDownloadTokens: uuid.v4(),
                    },
                },
            });
            let url = '';

            await bucket
            .file(destination)
            .getSignedUrl({
                action: DB_CONFIG.read,
                expires: DB_CONFIG.expiration
            })
            .then((downloadUrl) => {
                url = downloadUrl[0];
            });
            return url;
        } catch (exception) {
            this._image_exception.uploadPublicFileException(exception);
            return null as any;
        }
    }
    uploadPrivateFile(path: string, destination: string): Promise<string> {
        /**
         * Make public url and save it with the path
         * then remove token from url and concat between the rest and file path
         * then foreach request parse the stored url and concat with generated tokens
         * then run job or thread every time and set new access token
         * for more info. see the link below
         * https://www.sentinelstand.com/article/guide-to-firebase-storage-download-urls-tokens
         */
        ///////////////////////////////////////////////////////////////////////////////////
        /***/
        ///////////////////////////////////////////////////////////////////////////////////
        /**
         * Write your logic here!
         */
        throw new Error("Method not implemented.");
    }
    async delete(destination: string): Promise<boolean> {
        try {
            await bucket.file(destination).delete();
            return true;
        } catch (exception) {
            this._image_exception.deleteException(exception);
            return false;
        }
    }

    async clearLocalFile(path: string): Promise<void> {
        try {
            fs.unlinkSync(path);
        } catch (exception) {
            this._image_exception.clearLocalFileException(exception);
        }
    }
}
