import { userDb } from ".";
import { DATABASE } from "../../config";
import { User } from "../entities/user";
import { FollowDb } from "../usecases/follow/follow-db-interface";
import { db } from "./admin";

export default class makeFollowDb implements FollowDb {
    async insert(first_id: string, second_id: string): Promise<boolean> {
        try {
            let data = new Map<string, string>();

            data[DATABASE.FOLLOW_USER_ID_ENTRY] = first_id;
            data[DATABASE.FOLLOW_FOLLOWING_ID_ENTRY] = second_id;

            await db
                .collection(DATABASE.FOLLOW_COLLECTION_ENTRY)
                .doc(first_id)
                .collection(DATABASE.FOLLOW_USER_COLLECTION_ENTRY)
                .doc(second_id)
                .set(data);
            return true;
        } catch (exception) {
            throw exception;
        }
    }

    async delete(first_id: string, second_id: string): Promise<boolean> {
        try {
            let data = new Map<string, string>();

            data[DATABASE.FOLLOW_USER_ID_ENTRY] = first_id;
            data[DATABASE.FOLLOW_FOLLOWING_ID_ENTRY] = second_id;

            await db
                .collection(DATABASE.FOLLOW_COLLECTION_ENTRY)
                .doc(first_id)
                .collection(DATABASE.FOLLOW_USER_COLLECTION_ENTRY)
                .doc(second_id)
                .delete();
            return true;
        } catch (exception) {
            throw exception;
        }
    }

    get(id: string): Promise<User[]> {
        throw new Error("Method not implemented.");
    }

    async follow(follower_id: string, following_id: string): Promise<boolean> {
        try {
            let conditions = new Map<string, string>();

            // fetching first user
            conditions[DATABASE.USER_ID_ENTRY] = follower_id;
            var first_user = await userDb.get(conditions)[0];

            // fetching second user
            conditions[DATABASE.USER_ID_ENTRY] = following_id;
            var second_user = await userDb.get(conditions)[0];

            // incrementation for follows
            first_user.incrementFollowing();
            second_user.incrementFollowers();

            // Update user data
            await userDb.update(first_user);
            await userDb.update(second_user);

            // Insert follow
            await this.insert(follower_id, following_id);
            return true;
        } catch (exception) {
            throw exception;
        }
    }

    async unfollow(
        follower_id: string,
        following_id: string
    ): Promise<boolean> {
        try {
            let conditions = new Map<string, string>();

            // fetching first user
            conditions[DATABASE.USER_ID_ENTRY] = follower_id;
            var first_user = await userDb.get(conditions)[0];

            // fetching second user
            conditions[DATABASE.USER_ID_ENTRY] = following_id;
            var second_user = await userDb.get(conditions)[0];

            // incrementation for follows
            first_user.decrementFollowing();
            second_user.decrementFollowers();

            // Update user data
            await userDb.update(first_user);
            await userDb.update(second_user);

            // Insert follow
            await this.delete(follower_id, following_id);
            return true;
        } catch (exception) {
            throw exception;
        }
    }
}
