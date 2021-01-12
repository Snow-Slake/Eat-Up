import { DATABASE } from "../../config";

export class User {
    constructor(
        private _id: string,
        private _firstName: string,
        private _lastName: string,
        private _email: string,
        private _password: string,
        private _profileImageUrl: string,
        private _coverImageUrl: string,
        private _numOfFollowers: number,
        private _numOfFollowing: number
    ) {}

    get id(): string {
        return this._id;
    }

    get firstName(): string {
        return this._firstName;
    }

    get lastName(): string {
        return this._lastName;
    }

    get profileImageUrl(): string {
        return this._profileImageUrl;
    }

    get coverImageUrl(): string {
        return this._coverImageUrl;
    }

    get password(): string {
        return this._password;
    }

    get email(): string {
        return this._email;
    }

    get numOfFollowers(): number {
        return this._numOfFollowers;
    }

    get numOfFollowing(): number {
        return this._numOfFollowing;
    }

    incrementFollowers = () => {
        this._numOfFollowers++;
    }

    decrementFollowers = () => {
        this._numOfFollowers--;
    }

    incrementFollowing = () => {
        this._numOfFollowing++;
    }

    decrementFollowing = () => {
        this._numOfFollowing--;
    }

    toJson = () => {
        let user = {};
        user[DATABASE.USER_ID_ENTRY] = this.id;
        user[DATABASE.USER_FIRST_NAME_ENTRY] = this.firstName;
        user[DATABASE.USER_LAST_NAME_ENTRY] = this.lastName;
        user[DATABASE.USER_PASSWORD_ENTRY] = this.password;
        user[DATABASE.USER_EMAIL_ENTRY] = this.email;
        user[DATABASE.USER_COVER_IMAGE_ENTRY] = this.coverImageUrl;
        user[DATABASE.USER_PROFILE_IMAGE_ENTRY] = this.profileImageUrl;
        user[DATABASE.USER_FOLLOWER_ENTRY] = this.numOfFollowers;
        user[DATABASE.USER_FOLLOWING_ENTRY] = this.numOfFollowing;
        return user;
    };
}
