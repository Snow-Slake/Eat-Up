import express from "express";
import bodyParser from "body-parser";
import {
    addUserController,
    updateUserController,
    deleteUserController,
    getUserController,
    followController,
    unfollowController,
    getFollowController,
    clearFollowDocController,
    generateTokenController,
    refreshTokenController,
    verifyTokenController,
} from "./src/controller";
import { makeExpressCallback } from "./src/express-callback";
import { API_ROOT } from "./src/config";

const port = process.env.port || 3000;

const app = express();
app.use(bodyParser.json());

//-----------------------------------------User callback--------------------------------------//
app.post(API_ROOT.addUserAPI, makeExpressCallback({ addUserController }));
app.post(API_ROOT.updateUserAPI, makeExpressCallback({ updateUserController }));
app.post(API_ROOT.deleteUserAPI, makeExpressCallback({ deleteUserController }));
app.post(API_ROOT.getUserAPI, makeExpressCallback({ getUserController }));

//-----------------------------------------Follow callback--------------------------------------//
app.post(API_ROOT.followUserAPI, makeExpressCallback({ followController }));
app.post(API_ROOT.unfollowUserAPI, makeExpressCallback({ unfollowController }));
app.post(API_ROOT.getFollowAPI, makeExpressCallback({ getFollowController }));
app.post(API_ROOT.clearFollowAPI, makeExpressCallback({ clearFollowDocController }));

//-----------------------------------------Token callback--------------------------------------//
app.post(API_ROOT.generateTokensAPI, makeExpressCallback({ generateTokenController }));
app.post(API_ROOT.refreshTokensAPI, makeExpressCallback({ refreshTokenController }));
app.post(API_ROOT.verifyTokensAPI, makeExpressCallback({ verifyTokenController }));

// listen for requests
app.listen(port, () => {
    console.log("Server is listening on port " + port);
});

export default app;
