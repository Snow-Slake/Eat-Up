import { User } from "./user";
import { UserValidators } from "./user-validator-interface";
import { ValidatorException } from "./exception";

export function buildMakeUser(validtor: UserValidators, validator_exception: ValidatorException) {
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
            validator_exception.emailException();
            return null;
        }

        if (!validtor.vaildatePassword(user.password)) {
            validator_exception.emailException();
            return null;
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
