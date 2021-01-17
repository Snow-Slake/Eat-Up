import { buildMakeFridge } from "./build-make-fridge";
import { buildEditFridge } from "./build-edit-fridge";

export { Fridge } from "./fridge";

export const makeFridge = buildMakeFridge();
export const editFridge = buildEditFridge();