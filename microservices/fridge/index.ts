import express from "express";
import bodyParser from "body-parser";
import makeExpressCallback from "./src/express-callback";
import {
    addFridgeController,
    uploadFridgeController,
    deleteFridgeController,
    getFridgeController,
    uploadFileController,
    deleteFileController,
} from "./src/controller";
import {
    REQ_ADD_FRIDGE,
    REQ_DELETE_FRIDGE,
    REQ_FILE_REMOVAL,
    REQ_GET_FRIDGE,
    REQ_PUBLIC_FILE_UPLOADER,
    REQ_UPLOAD_FRIDGE,
} from "./src/config";
const app = express();
app.use(bodyParser.json());

//-----------------------------------------Fridge callback--------------------------------------//
app.post(REQ_ADD_FRIDGE, makeExpressCallback({ addFridgeController }));
app.post(REQ_UPLOAD_FRIDGE, makeExpressCallback({ uploadFridgeController }));
app.post(REQ_DELETE_FRIDGE, makeExpressCallback({ deleteFridgeController }));
app.post(REQ_GET_FRIDGE, makeExpressCallback({ getFridgeController }));

//-----------------------------------------Fridge callback--------------------------------------//
app.post(REQ_PUBLIC_FILE_UPLOADER, makeExpressCallback({ uploadFileController }));
app.post(REQ_FILE_REMOVAL, makeExpressCallback({ deleteFileController }));

// listen for requests
const port = process.env.port || 4000;
app.listen(port, () => {
    console.log("Server is listening on port " + port);
});
