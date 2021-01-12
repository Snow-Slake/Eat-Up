import { DATABASE } from "../../../config";
import { User } from "../../entities/user";
import { UserDb } from "./user-db-interface";

export default function makeGetUser(userDb: UserDb) {
    return async function getUser(id: string): Promise<Array<User>> {
        let conditions: string[] = [];
        
        conditions.push(DATABASE.USER_ID_ENTRY);
        conditions.push(id);

        return await userDb.get(conditions);
    };
}
