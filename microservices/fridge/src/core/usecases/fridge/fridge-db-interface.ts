import { Fridge } from "../../entities";

export interface FridgeDB {
    insert(fridge: Fridge): Promise<boolean>;
    update(fridge: Fridge): Promise<boolean>;
    delete(id: string): Promise<boolean>;
    get(id: string): Promise<Fridge | undefined>;
}