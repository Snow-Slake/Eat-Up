import { makeUser } from "../../entities/index";
import { UserDb } from "./user-db-interface";

export default function makeDeleteUser(userDb: UserDb) {
    return async function deleteUser(
        id: string,
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        numOfFollowers: number,
        numOfFollowing: number,
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
            numOfFollowers: numOfFollowers,
            numOfFollowing: numOfFollowing,
            profileImageUrl: profileImageUrl,
        });

        return await userDb.delete(current_user);
    };
}
