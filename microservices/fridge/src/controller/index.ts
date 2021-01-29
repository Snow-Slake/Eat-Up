import makeAddFridgeController from "./fridge/call-add-fridge";
import IFridgeControllerException from "./fridge/exception/exception-interface-imp";
import makeUpdateFridgeController from "./fridge/call-update-fridge";
import makeDeleteFridgeController from "./fridge/call-delete-fridge";
import makeGetFridgeController from "./fridge/call-get-fridge";
import makeUploadPublicFileController from "./image/call-upload-public-file";
import makeDeleteFileController from "./image/call-delete-file";
import IFileControllerException from "./image/exception/exception-interface-imp";
import { addFridge, updateFridge, deleteFridge, getFridge } from "../core/usecases";
import { uploadPublicFile, deleteFile } from "../core/usecases";

//-------------------------------------------Fridge controller-----------------------------------//
export const addFridgeController = makeAddFridgeController(new IFridgeControllerException(), {
    addFridge,
});
export const uploadFridgeController = makeUpdateFridgeController(new IFridgeControllerException(), {
    updateFridge,
});
export const deleteFridgeController = makeDeleteFridgeController(new IFridgeControllerException(), {
    deleteFridge,
});
export const getFridgeController = makeGetFridgeController(new IFridgeControllerException(), {
    getFridge,
});

//-------------------------------------------Image controller-----------------------------------//
export const uploadFileController = makeUploadPublicFileController(new IFileControllerException(), {
    uploadPublicFile,
});
export const deleteFileController = makeDeleteFileController(new IFileControllerException(), {
    deleteFile,
});
