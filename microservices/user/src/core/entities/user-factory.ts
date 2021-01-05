import { User } from "./user";

export function buildMakeUser(validtor: UserValidators) {
    return function makeUser(user: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        profileImageUrl: string;
        coverImageUrl: string;
        numOfFollowers: number;
        numOfFollowing: number;
    }): User {
        if (!validtor.vaildateEmail(user.email)) {
            // TODO: call email not vaild exception
        }

        if (!validtor.vaildatePassword(user.password)) {
            // TODO: call email not vaild exception
        }

        let currentUser = new User(
            user.id,
            user.firstName,
            user.lastName,
            user.email,
            user.password,
            user.profileImageUrl,
            user.coverImageUrl,
            user.numOfFollowers,
            user.numOfFollowing
        );
        return currentUser;
    };
}

export interface UserValidators {
    vaildateEmail(email: string): boolean;
    vaildatePassword(password: string): boolean;
}
