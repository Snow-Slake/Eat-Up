export interface UserControllerException {
    addUserControllerException(exception: string): void;
    updateUserControllerException(exception: string): void;
    deleteUserControllerException(exception: string): void;
    getUserControllerException(exception: string): void;
}

export interface FollowControllerException {
    followControllerException(exception: string): void;
    unfollowControllerException(exception: string): void;
    getFollowControllerException(exception: string): void;
    clearFollowDocControllerException(exception: string): void;
}

export interface TokenControllerException {
    generateTokenControllerException(exception: string): void;
    refreshTokenControllerException(exception: string): void;
    verifyTokenControllerException(exception: string): void;
}