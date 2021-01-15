import { FileManager } from "../usecases";
import editJsonFile from 'edit-json-file';
import { LOCAL } from "../../config";
import { FileException } from "./exception";

export default class makeFileManager implements FileManager {
    constructor(private _file_exception: FileException) {}

    async insert(key: string, value: string): Promise<boolean> {
        try {
            let file = editJsonFile(LOCAL.FILE_NAME, {
                autosave: true
            });
            file.set(key, value);
            return true;
        } catch (exception) {
            this._file_exception.insertFileException(exception);
        }
        return false;
    }

    async delete(key: string): Promise<boolean> {
        try {
            let file = editJsonFile(LOCAL.FILE_NAME, {
                autosave: true
            });
            file.unset(key);
            return true;
        } catch (exception) {
            this._file_exception.deleteFileException(exception);
        }
        return false;
    }

    async get(key: string): Promise<string> {
        try {
            let file = editJsonFile(LOCAL.FILE_NAME);
            return file.get(key);
        } catch (exception) {
            this._file_exception.getFileException(exception);
        }
        return null as any;
    }
}
