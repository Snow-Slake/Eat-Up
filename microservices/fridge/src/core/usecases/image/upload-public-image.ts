import { ImageManager } from './image-interface';

export default function makePublicFileUploader(image_manager: ImageManager) {
    return async function publicFileUploader(path: string, destination: string): Promise<string> {
        const value = await image_manager.uploadPublicFile(path, destination);
        await image_manager.clearLocalFile(path);
        return value;
    }
}