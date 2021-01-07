import { FileManager } from "../usecases";
import * as fs from "fs";
import { LOCAL } from "../../config";

export default class makeFileManager implements FileManager {
    async insert(key: string, value: string): Promise<boolean> {
        try {
            let data = await this._loadData();
            data[key] = value;
            fs.writeFileSync(
                LOCAL.FILE_NAME,
                JSON.stringify(data, null, LOCAL.SPACER)
            );
            return true;
        } catch (exception) {
            throw exception;
        }
    }

    async delete(key: string): Promise<boolean> {
        try {
            let data = await this._loadData();
            if (data.has(key)) {
                data.delete(key);
            }
            return true;
        } catch (exception) {
            throw exception;
        }
    }

    async get(key: string): Promise<string> {
        try {
            let data = await this._loadData();
            return data.has(key) ? data[key] : null;
        } catch (exception) {
            throw exception;
        }
    }

    private async _loadData(): Promise<Map<string, string>> {
        try {
            var data = JSON.parse(
                fs.existsSync(LOCAL.FILE_NAME)
                    ? fs.readFileSync(LOCAL.FILE_NAME).toString()
                    : '""'
            );
            return data;
        } catch (exception) {
            throw exception;
        }
    }
}
