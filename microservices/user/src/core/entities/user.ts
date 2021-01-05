export function makeUser();

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

    get email(): string {
        return this._email;
    }

    get numOfFollwers(): number {
        return this._numOfFollowers;
    }

    get numOfFollwing(): number {
        return this._numOfFollowing;
    }
}
