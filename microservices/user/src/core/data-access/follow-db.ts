import { fileManager, userDb } from ".";
import { DATABASE, DB_OPERATION } from "../../config";
import { makeUser } from "../entities";
import { User } from "../entities/user";
import { FollowDb } from "../usecases";
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

    async get(id: string): Promise<Array<User>> {
        try {
            // Read doc from file
            var last_id = await fileManager.get(id);

            // Fetching data
            var data = db
                .collection(DATABASE.FOLLOW_COLLECTION_ENTRY)
                .doc(id)
                .collection(DATABASE.FOLLOW_USER_COLLECTION_ENTRY)
                .orderBy(DATABASE.FOLLOW_FOLLOWING_ID_ENTRY, DB_OPERATION.ASC);

            // Getting last doc
            if (last_id != null) {
                let last_doc = await this._getLastDoc(id, last_id);
                data = data.startAfter(last_doc);
            }

            // Continue fetching
            var doc = await data.limit(DB_OPERATION.LIMITS).get();

            // Parsing docs
            var users = [];

            doc.docs.forEach((user) => {
                users.push(
                    makeUser({
                        id: user[DATABASE.USER_ID_ENTRY],
                        firstName: user[DATABASE.USER_FIRST_NAME_ENTRY],
                        lastName: user[DATABASE.USER_LAST_NAME_ENTRY],
                        password: user[DATABASE.USER_PASSWORD_ENTRY],
                        email: user[DATABASE.USER_EMAIL_ENTRY],
                        coverImageUrl: user[DATABASE.USER_COVER_IMAGE_ENTRY],
                        profileImageUrl:
                            user[DATABASE.USER_PROFILE_IMAGE_ENTRY],
                        numOfFollowers: user[DATABASE.USER_FOLLOWER_ENTRY],
                        numOfFollowing: user[DATABASE.USER_FOLLOWING_ENTRY],
                    })
                );
            });

            // Update last document
            await fileManager.insert(id, users[users.length - 1]);

            // Return data
            return users;
        } catch (exception) {
            throw exception;
        }
    }

    async clear(id: string): Promise<boolean> {
        try {
            // Clear data
            await fileManager.delete(id);
            return true;
        } catch (exception) {
            throw exception;
        }
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

            // decrementation for follows
            first_user.decrementFollowing();
            second_user.decrementFollowers();

            // Update user data
            await userDb.update(first_user);
            await userDb.update(second_user);

            // Delete follow
            await this.delete(follower_id, following_id);
            return true;
        } catch (exception) {
            throw exception;
        }
    }

    async _getLastDoc(
        user_id: string,
        following_id: string
    ): Promise<
        firebase.default.firestore.QuerySnapshot<firebase.default.firestore.DocumentData>
    > {
        return await db
            .collection(DATABASE.FOLLOW_COLLECTION_ENTRY)
            .doc(user_id)
            .collection(DATABASE.FOLLOW_USER_COLLECTION_ENTRY)
            .orderBy(DATABASE.FOLLOW_FOLLOWING_ID_ENTRY, DB_OPERATION.ASC)
            .where(
                DATABASE.FOLLOW_FOLLOWING_ID_ENTRY,
                DB_OPERATION.EQUAL,
                following_id
            )
            .get();
    }
}
