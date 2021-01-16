import IImageException from "./exception/image-exception";
import IImageManager from "./image-manager";

export const imageManager = new IImageManager(new IImageException());
