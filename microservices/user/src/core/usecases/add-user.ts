import { makeUser } from "../entities/index";
import { User } from "../entities/user";
import { UserDb } from "./user-db-interface";

export default function makeAddUser(userDb: UserDb) {
    return async function addUser(user: User): Promise<boolean> {
        const current_user = makeUser({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            coverImageUrl: user.coverImageUrl,
            numOfFollowers: 0,
            numOfFollowing: 0,
            profileImageUrl: user.profileImageUrl,
        });

        return await userDb.insert(current_user);
    };
}
