import { FileException } from "./exception-interface";

export class IFileException implements FileException {
    insertFileException(exception: string): void {
        throw new Error("insert data into file throw exception: " + exception);
    }
    deleteFileException(exception: string): void {
        throw new Error("delete data from file throw exception: " + exception);
    }
    getFileException(exception: string): void {
        throw new Error("get data from file throw exception: " + exception);
    }
    loadFileException(exception: string): void {
        throw new Error("load data of file throw exception: " + exception);
    }
}
