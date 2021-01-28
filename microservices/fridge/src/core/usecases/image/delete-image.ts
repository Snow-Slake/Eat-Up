import { ImageManager } from './image-interface';

export default function makeFileRemoval(image_manager: ImageManager) {
    return async function fileRemoval(path: string): Promise<boolean> {
        const value = await image_manager.delete(path);
        await image_manager.clearLocalFile(path);
        return value;
    }
}