import { User } from "../../entities/user";
import { FollowDb } from "./follow-db-interface";


export default function makeGetFollow(followDb: FollowDb) {
    return async function getUser(user_id: string): Promise<Array<User>> {
        return await followDb.get(user_id);
    };
}
