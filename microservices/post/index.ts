import express from "express";
import bodyParser from "body-parser";
import makeExpressCallback from "./src/express-callback";
import { addPostController, updatePostController, deletePostController } from "./src/controller";
import { REQ_ADD_POST, REQ_UPLOAD_POST, REQ_DELETE_POST } from "./src/config";
const app = express();
app.use(bodyParser.json());

//-----------------------------------------Post callback--------------------------------------//
app.post(REQ_ADD_POST, makeExpressCallback({ addPostController }));
app.post(REQ_UPLOAD_POST, makeExpressCallback({ updatePostController }));
app.post(REQ_DELETE_POST, makeExpressCallback({ deletePostController }));

// listen for requests
const port = process.env.port || 4000;
app.listen(port, () => {
    console.log("Server is listening on port " + port);
});
