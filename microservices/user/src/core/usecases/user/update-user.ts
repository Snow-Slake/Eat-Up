import { makeUser } from "../../entities/index";
import { User } from "../../entities/user";
import { UserDb } from "./user-db-interface";

export default function makeUpdateUser(userDb: UserDb) {
    return async function updateUser(user: User): Promise<boolean> {
        const current_user = makeUser({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            coverImageUrl: user.coverImageUrl,
            numOfFollowers: user.numOfFollowers,
            numOfFollowing: user.numOfFollowing,
            profileImageUrl: user.profileImageUrl,
        });

        return await userDb.update(current_user);
    };
}
