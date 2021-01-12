import { DATABASE, DB_OPERATION } from "../../config";
import { makeUser } from "../entities";
import { User } from "../entities/user";
import { UserDb } from "../usecases";
import { db } from "./index";
import firebase from 'firebase'
import { UserDbException } from "./exception";
import { Debugger } from "inspector";
import { promises } from "fs";

export default class makeUserDb implements UserDb {
    constructor(private _user_Exception: UserDbException) {}

    async insert(user: User): Promise<boolean> {
        try {
            await db.collection(DATABASE.USER_COLLECTION_ENTRY).doc(user.id).set(user.toJson());
            return true;
        } catch (exception) {
            this._user_Exception.insertUserDbException(exception);
        }
        return false;
    }

    async update(user: User): Promise<boolean> {
        try {
            await db
                .collection(DATABASE.USER_COLLECTION_ENTRY)
                .doc(user.id)
                .update(user.toJson());
            return true;
        } catch (exception) {
            this._user_Exception.updateUserDbException(exception);
        }
        return false;
    }

    async delete(user: User): Promise<boolean> {
        try {
            await db.collection(DATABASE.USER_COLLECTION_ENTRY).doc(user.id).delete();
            return true;
        } catch (exception) {
            this._user_Exception.deleteUserDbException(exception);
        }
        return false;
    }

    private async geUsers(conditions: Array<string>): Promise<firebase.firestore.DocumentData> {
            
        var collection = this._getCollection(DATABASE.USER_COLLECTION_ENTRY);

        for (let i = 0; i < conditions.length; i += 2) {
            collection = collection.where(conditions[i], DB_OPERATION.EQUAL, conditions[i + 1]);
        }

        return collection.get();
    }

    async get(conditions: Array<string>): Promise<Array<User>> {
        try {
            var doc = await this.geUsers(conditions);

            var users: User[] = [];
            for (let i = 0; i < doc.docs.length; i++) {
                let user = doc.docs[i].data();
                users.push(
                    makeUser({
                        id: user[DATABASE.USER_ID_ENTRY],
                        firstName: user[DATABASE.USER_FIRST_NAME_ENTRY],
                        lastName: user[DATABASE.USER_LAST_NAME_ENTRY],
                        password: user[DATABASE.USER_PASSWORD_ENTRY],
                        email: user[DATABASE.USER_EMAIL_ENTRY],
                        coverImageUrl: user[DATABASE.USER_COVER_IMAGE_ENTRY],
                        profileImageUrl: user[DATABASE.USER_PROFILE_IMAGE_ENTRY],
                        numOfFollowers: user[DATABASE.USER_FOLLOWER_ENTRY],
                        numOfFollowing: user[DATABASE.USER_FOLLOWING_ENTRY],
                    })
                );
            }
            return users;
        } catch (exception) {
            this._user_Exception.getUserDbException(exception);
        }
        return null as any;
    }

    async getRowDoc(conditions: Array<string>): Promise<Array<firebase.firestore.DocumentSnapshot>> {
        let doc = await this.geUsers(conditions);
        return doc.docs.map(user => user.data());
    }

    private _getCollection(
        path: string
    ): firebase.firestore.Query<firebase.firestore.DocumentData> {
        return db.collection(path);
    }
}
