import { DATABASE } from "../../config";
import { Fridge } from "../entities";
import { FridgeDB } from "../usecases/fridge/fridge-db-interface";
import { db } from "./admin";
import { FridgeException } from "./exception/exception-interface";

export default class IFridgeDB implements FridgeDB {
    constructor (private _fridge_exception: FridgeException) {}
    async insert(fridge: Fridge): Promise<boolean> {
        try {
            await db
                .collection(DATABASE.FRIDGE_COLLECTION_ENTRY)
                .doc(fridge.id)
                .set(fridge.toJson());
            return true;
        } catch (exception) {
            this._fridge_exception.insertFridgeException(exception);
            return false;
        }
    }
    async update(fridge: Fridge): Promise<boolean> {
        try {
            await db
            .collection(DATABASE.FRIDGE_COLLECTION_ENTRY)
            .doc(fridge.id)
            .update(fridge.toJson());

            return true;
        } catch (exception) {
            this._fridge_exception.updateFridgeException(exception);
            return false;
        }
    }
    async delete(id: string): Promise<boolean> {
        try {
            await db
            .collection(DATABASE.FRIDGE_COLLECTION_ENTRY)
            .doc(id)
            .delete();
            
            return true;
        } catch (exception) {
            this._fridge_exception.deleteFridgeException(exception);
            return false;
        }
    }
    async get(id: string): Promise<Fridge | undefined> {
        try {
            let doc = await db
            .collection(DATABASE.FRIDGE_COLLECTION_ENTRY)
            .doc(id)
            .get();

            let data = doc.data();

            if (data !== undefined) {
                let ingredient = new Map();
                for (let key in data[DATABASE.FRIDGE_INGREDIENT_ENTRY]) {
                    ingredient.set(key, data[DATABASE.FRIDGE_INGREDIENT_ENTRY][key]);
                }
                let fridge = new Fridge(
                    data[DATABASE.FRIDGE_ID_ENTRY],
                    ingredient
                );
                return fridge;
            }
            return undefined;
        } catch (exception) {
            this._fridge_exception.getFridgeException(exception);
            return undefined;
        }
    }
}
