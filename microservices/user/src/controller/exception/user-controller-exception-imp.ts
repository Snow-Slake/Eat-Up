import { FollowControllerException } from "./exception-interface";

export class IFollowControllerException implements FollowControllerException {
    followControllerException(exception: string): void {
        console.log("follow controller throw exception: " + exception);
    }
    unfollowControllerException(exception: string): void {
        console.log("unfollow controller throw exception: " + exception);
    }
    getFollowControllerException(exception: string): void {
        console.log("get follow controller throw exception: " + exception);
    }
    clearFollowDocControllerException(exception: string): void {
        console.log("clear follow doc controller throw exception: " + exception);
    }
}
