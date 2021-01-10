import { FollowDbException } from "./exception-interface";

export class IFollowDbException implements FollowDbException {
    insertFollowDbException(exception: string): void {
        console.log("insert follow into DB throw exception: " + exception);
    }
    deleteFollowDbException(exception: string): void {
        console.log("delete follow from DB throw exception: " + exception);
    }
    getFollowDbException(exception: string): void {
        console.log("get follow from DB throw exception: " + exception);
    }
    clearFollowDbException(exception: string): void {
        console.log("clear follow json document throw exception: " + exception);
    }
    followDbException(exception: string): void {
        console.log("follow user throw exception: " + exception);
    }
    unfollowDbException(exception: string): void {
        console.log("unfollow user throw exception: " + exception);
    }
    getLastDocException(exception: string): void {
        console.log("getting last doc from DB throw exception: " + exception);
    }
}
