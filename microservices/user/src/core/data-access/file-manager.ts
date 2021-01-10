import { FileManager } from "../usecases";
import * as fs from "fs";
import { LOCAL } from "../../config";
import { FileException } from "./exception";

export default class makeFileManager implements FileManager {
    constructor(private _file_exception: FileException) {}

    async insert(key: string, value: string): Promise<boolean> {
        try {
            let data = await this._loadData();
            data[key] = value;
            fs.writeFileSync(LOCAL.FILE_NAME, JSON.stringify(data, null, LOCAL.SPACER));
            return true;
        } catch (exception) {
            this._file_exception.insertFileException(exception);
        }
        return false;
    }

    async delete(key: string): Promise<boolean> {
        try {
            let data = await this._loadData();
            if (data.has(key)) {
                data.delete(key);
            }
            return true;
        } catch (exception) {
            this._file_exception.deleteFileException(exception);
        }
        return false;
    }

    async get(key: string): Promise<string> {
        try {
            let data = await this._loadData();
            return data.has(key) ? data[key] : null;
        } catch (exception) {
            this._file_exception.getFileException(exception);
        }
        return null;
    }

    private async _loadData(): Promise<Map<string, string>> {
        try {
            var data = JSON.parse(
                fs.existsSync(LOCAL.FILE_NAME) ? fs.readFileSync(LOCAL.FILE_NAME).toString() : '""'
            );
            return data;
        } catch (exception) {
            this._file_exception.loadFileException(exception);
        }
        return null;
    }
}
