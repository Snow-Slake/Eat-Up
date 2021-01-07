import { User } from "../../entities/user";

export interface FollowDb {
    insert(first_id: string, second_id: string): Promise<boolean>;
    delete(first_id: string, second_id: string): Promise<boolean>;
    get(id: string): Promise<Array<User>>;
    clear(id: string): Promise<boolean>;
    follow(follower_id: string, following_id: string): Promise<boolean>;
    unfollow(follower_id: string, following_id: string): Promise<boolean>;
}