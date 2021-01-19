import { tokenManager } from "../../data-access";
import { makeUser } from "../../entities";
import { User } from "../../entities/user";

export default function makeGenerateTokens() {
    return async function generateTokens(
        id: string,
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        profileImageUrl: string,
        coverImageUrl: string
    ): Promise<Map<string, string>> {
        const user = makeUser({
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
        return await tokenManager.generateToken(user);
    };
}
