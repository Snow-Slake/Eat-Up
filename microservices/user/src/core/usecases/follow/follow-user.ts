import { FollowDb } from "./follow-db-interface";


export default function makeFollow(followDb: FollowDb) {
    return async function followUser(first_id: string, second_id: string): Promise<boolean> {
        return await followDb.follow(first_id, second_id);
    };
}
