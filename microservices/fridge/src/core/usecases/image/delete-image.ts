import { ImageManager } from './image-interface';

export default function makeFileRemoval(image_manager: ImageManager) {
    return async function fileRemoval(destination: string): Promise<boolean> {
        const value = await image_manager.delete(destination);
        return value;
    }
}