import { FollowDb } from "./follow-db-interface";


export default function makeAddFollow(followDb: FollowDb) {
    return async function addUser(first_id: string, second_id: string): Promise<boolean> {
        return await followDb.insert(first_id, second_id);
    };
}
