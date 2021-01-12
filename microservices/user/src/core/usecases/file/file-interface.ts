import { User } from "../../entities/user";

export interface FileManager {
    insert(key: string, value: firebase.default.firestore.DocumentSnapshot): Promise<boolean>;
    delete(key: string): Promise<boolean>;
    get(key: string): Promise<string>;
}