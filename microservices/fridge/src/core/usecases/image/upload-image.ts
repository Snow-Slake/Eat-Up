import { ImageManager } from './image-interface';

export default function makeImageUploader(image_manager: ImageManager) {
    return async function imageUploader(path: string, file: File): Promise<string> {
        return await image_manager.upload(path, file);
    }
}