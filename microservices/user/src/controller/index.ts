import {
    addUser,
    updateUser,
    deleteUser,
    getUser,
    follow,
    unFollow,
    getFollow,
    clearFollow,
} from "../core/usecases";
import { IUserControllerException } from "./exception/follow-controller-exception-imp";
import { IFollowControllerException } from "./exception/user-controller-exception-imp";
import makeClearFollowDocController from "./follow/clear-follow-doc";
import makeFollowController from "./follow/follow";
import makeGetFollowController from "./follow/get-follow";
import makeUnfollowController from "./follow/unfollow";
import makeAddUserController from "./user/add-user";
import makeDeleteUserController from "./user/delete-user";
import makeGetUserController from "./user/get-user";
import makeUpdateUserController from "./user/update-user";

//-------------------------------------------User controller-----------------------------------//
export const addUserController = makeAddUserController(new IUserControllerException(), { addUser });
export const updateUserController = makeUpdateUserController(new IUserControllerException(), {
    updateUser,
});
export const deleteUserController = makeDeleteUserController(new IUserControllerException(), {
    deleteUser,
});
export const getUserController = makeGetUserController(new IUserControllerException(), { getUser });

//-------------------------------------------follow controller--------------------------------//
export const followController = makeFollowController(new IFollowControllerException(), { follow });
export const unfollowController = makeUnfollowController(new IFollowControllerException(), {
    unFollow,
});
export const getFollowController = makeGetFollowController(new IFollowControllerException(), {
    getFollow,
});
export const clearFollowDocController = makeClearFollowDocController(
    new IFollowControllerException(),
    { clearFollow }
);
