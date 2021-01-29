import { imageManager } from "../data-access";
import { buildAddFridge, buildDeleteFridge, buildGetFridge, buildUpdateFridge } from './fridge'
import makeFileRemoval from "./image/delete-image";
import makePublicFileUploader from "./image/upload-public-image";

export const uploadPublicFile = makePublicFileUploader(imageManager);
export const deleteFile = makeFileRemoval(imageManager);
export const addFridge = buildAddFridge();
export const getFridge = buildGetFridge();
export const deleteFridge = buildDeleteFridge();
export const updateFridge = buildUpdateFridge();
