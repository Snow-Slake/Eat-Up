import { DATABASE, DB_OPERATION } from "../../config";
import { makeUser } from "../entities";
import { User } from "../entities/user";
import { UserDb } from "../usecases";
import { db } from "./index";
import { UserDbException } from "./exception";

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
            await db.collection(DATABASE.USER_COLLECTION_ENTRY).doc(user.id).update(user.toJson());
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

    async get(conditions: Array<string>): Promise<Array<User>> {
        try {
            let collection = this._getCollection(DATABASE.USER_COLLECTION_ENTRY);

            for (let i = 0; i < conditions.length; i += 2) {
                collection = collection.where(conditions[i], DB_OPERATION.EQUAL, conditions[i + 1]);
            }
            let doc = await collection.get();

            let users = Array<User>();

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
                        numOfFollowers: Number.parseInt(user[DATABASE.USER_FOLLOWER_ENTRY]),
                        numOfFollowing: Number.parseInt(user[DATABASE.USER_FOLLOWING_ENTRY]),
                    })
                );
            }
            
            return users;
        } catch (exception) {
            this._user_Exception.getUserDbException(exception);
        }
        return null as any;
    }

    private _getCollection(
        path: string
    ): firebase.default.firestore.Query<firebase.default.firestore.DocumentData> {
        return db.collection(path);
    }
}
