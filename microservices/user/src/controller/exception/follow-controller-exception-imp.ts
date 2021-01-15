import { UserControllerException } from "./exception-interface";

export class IUserControllerException implements UserControllerException {
    addUserControllerException(exception: string): void {
        console.log("add user controller throw exception: " + exception);
    }
    updateUserControllerException(exception: string): void {
        console.log("update user controller throw exception: " + exception);
    }
    deleteUserControllerException(exception: string): void {
        console.log("delete user controller throw exception: " + exception);
    }
    getUserControllerException(exception: string): void {
        console.log("get user controller throw exception: " + exception);
    }
}
