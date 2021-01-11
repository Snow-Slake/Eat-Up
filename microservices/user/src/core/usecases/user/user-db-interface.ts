import { User } from "../../entities/user";

export interface UserDb {
    insert(user: User): Promise<boolean>;
    update(user: User): Promise<boolean>;
    delete(user: User): Promise<boolean>;
    get(conditions: Array<string>): Promise<Array<User>>;
}
