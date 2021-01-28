import { imageManager } from "../data-access";
import makeImageUploader from "./image/upload-public-image";
import { buildAddFridge, buildDeleteFridge, buildGetFridge, buildUpdateFridge } from './fridge'

export const imageUploader = makeImageUploader(imageManager);
export const addFridge = buildAddFridge();
export const getFridge = buildGetFridge();
export const deleteFridge = buildDeleteFridge();
export const updateFridge = buildUpdateFridge();
