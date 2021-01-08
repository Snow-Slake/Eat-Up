import { FollowDb } from "./follow-db-interface";


export default function makeDeleteFollow(followDb: FollowDb) {
    return async function deleteUser(first_id: string, second_id: string): Promise<boolean> {
        return await followDb.delete(first_id, second_id);
    };
}
