import { makeUser } from "../../entities/index";
import { UserDb } from "./user-db-interface";

export default function makeAddUser(userDb: UserDb) {
    return async function addUser(
        id: string,
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        profileImageUrl: string,
        coverImageUrl: string
    ): Promise<boolean> {
        const current_user = makeUser({
            id: id,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            coverImageUrl: coverImageUrl,
            numOfFollowers: 0,
            numOfFollowing: 0,
            profileImageUrl: profileImageUrl,
        });

        return await userDb.insert(current_user);
    };
}
