import { UserDbException } from "./exception-interface";

export class IUserDbException implements UserDbException {
    insertUserDbException(exception: string): void {
        throw new Error("insert user into DB throw exception: " + exception);
    }
    updateUserDbException(exception: string): void {
        throw new Error("update user into DB throw exception: " + exception);
    }
    deleteUserDbException(exception: string): void {
        throw new Error("delete user from DB throw exception: " + exception);
    }
    getUserDbException(exception: string): void {
        throw new Error("get user from DB throw exception: " + exception);
    }
}
