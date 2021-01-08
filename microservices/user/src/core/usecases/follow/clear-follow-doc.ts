import { FollowDb } from "./follow-db-interface";


export default function makeClearFollow(followDb: FollowDb) {
    return async function clearUser(user_id: string): Promise<boolean> {
        return await followDb.clear(user_id);
    };
}
