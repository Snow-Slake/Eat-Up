import { UserDbException } from "./exception-interface";

export class IUserDbException implements UserDbException {
    insertUserDbException(exception: string): void {
        console.log("insert user into DB throw exception: " + exception);
    }
    updateUserDbException(exception: string): void {
        console.log("update user into DB throw exception: " + exception);
    }
    deleteUserDbException(exception: string): void {
        console.log("delete user from DB throw exception: " + exception);
    }
    getUserDbException(exception: string): void {
        console.log("get user from DB throw exception: " + exception);
    }
}
