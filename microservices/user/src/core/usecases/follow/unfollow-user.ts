import { FollowDb } from "./follow-db-interface";


export default function makeUnfollow(followDb: FollowDb) {
    return async function unfollowUser(first_id: string, second_id: string): Promise<boolean> {
        return await followDb.unfollow(first_id, second_id);
    };
}
