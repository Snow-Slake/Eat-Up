import { FollowDb } from "./follow-db-interface";

export default function makeGetFollow(followDb: FollowDb) {
    return async function getUser(user_id: string): Promise<Array<any>> {
        let get_users = await followDb.get(user_id);
        let users = Array<any>();

        if (get_users != null && get_users != undefined) {
            get_users.forEach((user) => {
                users.push(user.toJson());
            });
        }

        return users;
    };
}
