import { DATABASE } from "../../../config";
import { User } from "../../entities/user";
import { UserDb } from "./user-db-interface";

export default function makeGetUser(userDb: UserDb) {
    return async function getUser(id: string): Promise<Array<User>> {
        let conditions = new Map<string, string>();
        
        conditions[DATABASE.USER_ID_ENTRY] = id;

        return await userDb.get(conditions);
    };
}
