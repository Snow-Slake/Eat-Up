import { User } from "../entities/user";
import { UserDb } from "../usecases";

export default class makeUserDb implements UserDb {
    constructor (private makeDb: Function) {}

    insert(user: User): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    update(user: User): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    delete(user: User): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    get(value: string, field: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    follow(follower_id: any, following_id: any): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}