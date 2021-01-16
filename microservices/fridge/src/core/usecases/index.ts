import { imageManager } from "../data-access";
import makeImageUploader from "./image/upload-image";

export const imageUploader = makeImageUploader(imageManager);