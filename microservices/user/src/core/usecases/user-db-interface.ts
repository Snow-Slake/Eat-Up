import { User } from "../entities/user";

export interface UserDb {
    insert(user: User): Promise<boolean>;
    update(user: User): Promise<boolean>;
    delete(user: User): Promise<boolean>;
    get(value: string, field: string): Promise<boolean>;
    follow(follower_id, following_id): Promise<boolean>;
}
