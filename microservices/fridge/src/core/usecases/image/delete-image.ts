import { ImageManager } from './image-interface';

export default function makeImageRemoval(image_manager: ImageManager) {
    return async function imageRemoval(path: string): Promise<boolean> {
        return await image_manager.delete(path);
    }
}