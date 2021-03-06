import { fridgeDB } from "../../data-access";
import { makeFridge } from "../../entities";

export function buildAddFridge() {
    return async function (
        id: string,
        ingredients: Array<string>,
        capacities: Array<number>,
        units: Array<string>
    ): Promise<boolean> {
        const fridge = await makeFridge(id, ingredients, capacities, units);
        
        return await fridgeDB.insert(fridge);
    };
}
