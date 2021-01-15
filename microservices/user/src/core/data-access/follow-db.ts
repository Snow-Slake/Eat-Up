import { fileManager, userDb } from ".";
import { DATABASE, DB_OPERATION } from "../../config";
import { User } from "../entities/user";
import { FollowDb } from "../usecases";
import { db } from "./admin";
import { FollowDbException } from "./exception";

export default class makeFollowDb implements FollowDb {
    constructor(private _follow_exception: FollowDbException) {}

    async insert(first_id: string, second_id: string): Promise<boolean> {
        try {
            let data = {};

            data[DATABASE.FOLLOW_USER_ID_ENTRY] = first_id;
            data[DATABASE.FOLLOW_FOLLOWING_ID_ENTRY] = second_id;
            data[DATABASE.FOLLOW_DATE_ENTRY] = Date.now();

            await db
                .collection(DATABASE.FOLLOW_COLLECTION_ENTRY)
                .doc(first_id)
                .collection(DATABASE.FOLLOW_USER_COLLECTION_ENTRY)
                .doc(second_id)
                .set(data);
            return true;
        } catch (exception) {
            this._follow_exception.insertFollowDbException(exception);
        }
        return false;
    }

    async delete(first_id: string, second_id: string): Promise<boolean> {
        try {
            await db
                .collection(DATABASE.FOLLOW_COLLECTION_ENTRY)
                .doc(first_id)
                .collection(DATABASE.FOLLOW_USER_COLLECTION_ENTRY)
                .doc(second_id)
                .delete();
            return true;
        } catch (exception) {
            this._follow_exception.deleteFollowDbException(exception);
        }
        return false;
    }

    async get(id: string): Promise<Array<User>> {
        try {
            // Read doc from file
            let last_id = await fileManager.get(id);

            // Fetching data
            let data = db
                .collection(DATABASE.FOLLOW_COLLECTION_ENTRY)
                .doc(id)
                .collection(DATABASE.FOLLOW_USER_COLLECTION_ENTRY)
                .orderBy(DATABASE.FOLLOW_DATE_ENTRY, DB_OPERATION.DESC);

            // Getting last doc
            if (last_id != null && last_id != undefined) {
                let last_doc = await this._getLastDoc(id, last_id);
                data = data.startAfter(last_doc.docs[0]);
            }

            // Continue fetching
            let doc = await db
            .collection(DATABASE.FOLLOW_COLLECTION_ENTRY)
            .doc(id)
            .collection(DATABASE.FOLLOW_USER_COLLECTION_ENTRY).limit(DB_OPERATION.LIMITS).get();

            // Parsing docs
            let users = Array<User>();
            let conditions = Array<string>();

            for (let i = 0; i < doc.docs.length; i++) {
                conditions = Array<string>();
                conditions.push(DATABASE.USER_ID_ENTRY);
                conditions.push(doc.docs[i].data()[DATABASE.FOLLOW_FOLLOWING_ID_ENTRY]);
                let value = (await userDb.get(conditions))[0];
                users.push(value);
            }

            // Update last document
            await fileManager.insert(id, users[users.length - 1].id);

            // Return data
            return users;
        } catch (exception) {
            this._follow_exception.getFollowDbException(exception);
        }
        return null as any;
    }

    async clear(id: string): Promise<boolean> {
        try {
            // Clear data
            await fileManager.delete(id);
            return true;
        } catch (exception) {
            this._follow_exception.clearFollowDbException(exception);
        }
        return false;
    }

    async follow(follower_id: string, following_id: string): Promise<boolean> {
        try {
            if (follower_id == following_id) {
                return false;
            }

            let conditions = Array<string>();

            // fetching first user
            conditions.push(DATABASE.USER_ID_ENTRY);
            conditions.push(follower_id);
            let first_user = (await userDb.get(conditions))[0];

            // clear list
            conditions.pop();
            conditions.pop();

            // fetching second user
            conditions.push(DATABASE.USER_ID_ENTRY);
            conditions.push(following_id);
            let second_user = (await userDb.get(conditions))[0];

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
            this._follow_exception.followDbException(exception);
        }
        return false;
    }

    async unfollow(follower_id: string, following_id: string): Promise<boolean> {
        try {
            if (follower_id == following_id) {
                return false;
            }

            let conditions = Array<string>();

            // fetching first user
            conditions.push(DATABASE.USER_ID_ENTRY);
            conditions.push(follower_id);
            let first_user = await userDb.get(conditions)[0];

            // clear list
            conditions.pop();
            conditions.pop();

            // fetching second user
            conditions.push(DATABASE.USER_ID_ENTRY);
            conditions.push(follower_id);
            let second_user = await userDb.get(conditions)[0];

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
            this._follow_exception.unfollowDbException(exception);
        }
        return false;
    }

    private async _getLastDoc(
        user_id: string,
        following_id: string
    ): Promise<firebase.default.firestore.QuerySnapshot<firebase.default.firestore.DocumentData>> {
        try {
            let doc = await db
            .collection(DATABASE.FOLLOW_COLLECTION_ENTRY)
            .doc(user_id)
            .collection(DATABASE.FOLLOW_USER_COLLECTION_ENTRY)
            .orderBy(DATABASE.FOLLOW_DATE_ENTRY, DB_OPERATION.DESC)
            .where(DATABASE.FOLLOW_FOLLOWING_ID_ENTRY, DB_OPERATION.EQUAL, following_id)
            .get();
            return doc;
        } catch (exception) {
            this._follow_exception.getLastDocException(exception);
        }
        return null as any;
    }
}
