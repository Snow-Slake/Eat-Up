import { FileManager } from "../usecases";
import * as fs from "fs";
import { LOCAL } from "../../config";
import { FileException } from "./exception";
import { User } from "../entities/user";

export default class makeFileManager implements FileManager {
    constructor(private _file_exception: FileException) {}

    async insert(key: string, value: firebase.default.firestore.DocumentSnapshot): Promise<boolean> {
        try {
            let data = await this._loadData();
            data[key] = value;
            if (!fs.existsSync(LOCAL.FILE_NAME)){
                fs.mkdirSync(LOCAL.FILE_NAME.split('/').slice(0, -1).join('/'), {recursive: true});
            }
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
            if (data && data.has(key)) {
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
            return data && data[key] ? data[key] : null;
        } catch (exception) {
            this._file_exception.getFileException(exception);
        }
        return null as any;
    }

    private async _loadData(): Promise<Map<string, firebase.default.firestore.DocumentSnapshot>> {
        try {
            var data = JSON.parse(
                fs.existsSync(LOCAL.FILE_NAME) ? fs.readFileSync(LOCAL.FILE_NAME).toString() : '{}'
            );
            return data;
        } catch (exception) {
            this._file_exception.loadFileException(exception);
        }
        return null as any;
    }
}
