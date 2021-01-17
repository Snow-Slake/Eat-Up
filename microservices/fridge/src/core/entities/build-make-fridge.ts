import { Fridge } from "./fridge";

export function buildMakeFridge() {
    return async function(id: string, ingredients: Array<string>, capacities: Array<number>, units: Array<string>) : Promise<Fridge | undefined> {
        return undefined;
    }
}