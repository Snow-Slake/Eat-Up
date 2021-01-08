import { FileManager } from "./file-interface";

export default function makeAddFile(fileManager: FileManager) {
    return async function addFile(key: string, value: string): Promise<boolean> {
        return await fileManager.insert(key, value);
    };
}
