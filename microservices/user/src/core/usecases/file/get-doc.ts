import { FileManager } from "./file-interface";

export default function makeGetFile(fileManager: FileManager) {
    return async function getFile(key: string): Promise<string> {
        return await fileManager.get(key);
    };
}
