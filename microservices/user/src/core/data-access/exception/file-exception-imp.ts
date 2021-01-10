import { FileException } from "./exception-interface";

export class IFileException implements FileException {
    insertFileException(exception: string): void {
        console.log("insert data into file throw exception: " + exception);
    }
    deleteFileException(exception: string): void {
        console.log("delete data from file throw exception: " + exception);
    }
    getFileException(exception: string): void {
        console.log("get data from file throw exception: " + exception);
    }
    loadFileException(exception: string): void {
        console.log("load data of file throw exception: " + exception);
    }
}
