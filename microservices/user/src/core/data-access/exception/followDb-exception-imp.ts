import { FollowDbException } from "./exception-interface";

export class IFollowDbException implements FollowDbException {
    insertFollowDbException(exception: string): void {
        throw new Error("insert follow into DB throw exception: " + exception);
    }
    deleteFollowDbException(exception: string): void {
        throw new Error("delete follow from DB throw exception: " + exception);
    }
    getFollowDbException(exception: string): void {
        throw new Error("get follow from DB throw exception: " + exception);
    }
    clearFollowDbException(exception: string): void {
        throw new Error("clear follow json document throw exception: " + exception);
    }
    followDbException(exception: string): void {
        throw new Error("follow user throw exception: " + exception);
    }
    unfollowDbException(exception: string): void {
        throw new Error("unfollow user throw exception: " + exception);
    }
    getLastDocException(exception: string): void {
        throw new Error("getting last doc from DB throw exception: " + exception);
    }
}
