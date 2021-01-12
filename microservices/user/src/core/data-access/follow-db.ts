import { fileManager, userDb } from ".";
import { DATABASE, DB_OPERATION } from "../../config";
import { makeUser } from "../entities";
import { User } from "../entities/user";
import { FollowDb } from "../usecases";
import { db } from "./admin";
import { FollowDbException } from "./exception";
import firebase from 'firebase'

export default class makeFollowDb implements FollowDb {
    constructor(private _follow_exception: FollowDbException) {}

    async insert(first_id: string, second_id: string): Promise<boolean> {
        try {
            let data = {};

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
            var users: User[] = [];

            users = (await Promise.all(doc.docs.map((user) => {
                const follow_pair = user.data();
                return userDb.get([DATABASE.USER_ID_ENTRY, follow_pair[DATABASE.FOLLOW_FOLLOWING_ID_ENTRY]]);
            }))).map( users => users[0]);

            // Update last document
            let last_doc = (await userDb.getRowDoc([DATABASE.USER_ID_ENTRY, doc.docs[doc.docs.length - 1]
                .data()[DATABASE.FOLLOW_FOLLOWING_ID_ENTRY]]))[0];
            await fileManager.insert(id, last_doc);

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
            let conditions: string[] = [];

            // fetching first user
            conditions.push(DATABASE.USER_ID_ENTRY);
            conditions.push(follower_id);
            var first_user = (await userDb.get(conditions))[0];

            // fetching second user
            conditions = []
            conditions.push(DATABASE.USER_ID_ENTRY);
            conditions.push(following_id);
            var second_user = (await userDb.get(conditions))[0];

            // incrementation for follows
            first_user.incrementFollowing();
            second_user.incrementFollowers();
            // Update user data
            let ret = await userDb.update(first_user);
            ret &&= await userDb.update(second_user);

            // Insert follow
            ret &&= await this.insert(follower_id, following_id);
            return ret;
        } catch (exception) {
            this._follow_exception.followDbException(exception);
        }
        return false;
    }

    async unfollow(follower_id: string, following_id: string): Promise<boolean> {
        try {
            let conditions: string[] = [];

            // fetching first user
            conditions.push(DATABASE.USER_ID_ENTRY);
            conditions.push(follower_id);
            var first_user = await userDb.get(conditions)[0];

            // fetching second user
            conditions = []
            conditions.push(DATABASE.USER_ID_ENTRY);
            conditions.push(following_id);
            var second_user = await userDb.get(conditions)[0];
            console.log(first_user, second_user);
            // decrementation for follows
            first_user.decrementFollowing();
            second_user.decrementFollowers();
            
            // Update user data
            let ret = await userDb.update(first_user);
            ret &&= await userDb.update(second_user);

            // Delete follow
            ret &&= await this.delete(follower_id, following_id);
            return ret;
        } catch (exception) {
            this._follow_exception.unfollowDbException(exception);
        }
        return false;
    }

    private async _getLastDoc(
        user_id: string,
        following_id: string
    ): Promise<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> {
        try {
            return await db
                .collection(DATABASE.FOLLOW_COLLECTION_ENTRY)
                .doc(user_id)
                .collection(DATABASE.FOLLOW_USER_COLLECTION_ENTRY)
                .orderBy(DATABASE.FOLLOW_FOLLOWING_ID_ENTRY, DB_OPERATION.ASC)
                .where(DATABASE.FOLLOW_FOLLOWING_ID_ENTRY, DB_OPERATION.EQUAL, following_id)
                .get();
        } catch (exception) {
            this._follow_exception.getLastDocException(exception);
        }
        return null as any;
    }
}
