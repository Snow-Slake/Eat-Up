import { Fridge } from "./fridge";

export function buildEditFridge() {
    return async function(frridge: Fridge, ingredient_name: string, contents: {capcity?: number, unit?: string}) : Promise<Fridge | undefined> {
        return undefined;
    }
}