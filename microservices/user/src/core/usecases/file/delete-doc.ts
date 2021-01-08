import { FileManager } from "./file-interface";

export default function makeDeleteFile(fileManager: FileManager) {
    return async function deleteFile(key: string): Promise<boolean> {
        return await fileManager.delete(key);
    };
}
