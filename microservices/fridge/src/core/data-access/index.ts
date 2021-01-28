import IImageException from "./exception/image-exception";
import IImageManager from "./image-manager";
import IFridgeDB from './fridge-db';
import IFridgeException from "./exception/fridge-exception";

export const imageManager = new IImageManager(new IImageException());
export const fridgeDB = new IFridgeDB(new IFridgeException());
