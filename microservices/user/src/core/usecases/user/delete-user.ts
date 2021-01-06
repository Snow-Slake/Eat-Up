import { makeUser } from "../../entities/index";
import { User } from "../../entities/user";
import { UserDb } from "./user-db-interface";

export default function makeDeleteUser(userDb: UserDb) {
    return async function deleteUser(user: User): Promise<boolean> {
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

        return await userDb.delete(current_user);
    };
}
