export interface UserDbException {
    insertUserDbException(exception: string): void;
    updateUserDbException(exception: string): void;
    deleteUserDbException(exception: string): void;
    getUserDbException(exception: string): void;
}

export interface FollowDbException {
    insertFollowDbException(exception: string): void;
    deleteFollowDbException(exception: string): void;
    getFollowDbException(exception: string): void;
    clearFollowDbException(exception: string): void;
    followDbException(exception: string): void;
    unfollowDbException(exception: string): void;
    getLastDocException(exception: string): void;
}

export interface FileException {
    insertFileException(exception: string): void;
    deleteFileException(exception: string): void;
    getFileException(exception: string): void;
    loadFileException(exception: string): void;
}
