import { UserDb } from "./user-db-interface";

export default function makeGetUser(userDb: UserDb) {
    return async function getUser(conditions: Array<string>): Promise<Array<any>> {
        let users = await userDb.get(conditions);
        let get_users = Array<any>();

        if (users != null && users != undefined) {
            users.forEach((user) => {
                get_users.push(user.toJson());
            });
        }

        return get_users;
    };
}
