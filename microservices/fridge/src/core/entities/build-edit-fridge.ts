import { Fridge } from "./fridge";

export function buildEditFridge() {
    return async function(id: string, ingredient_name: string, contents: {capcity?: number, unit?: string}) : Promise<boolean> {
        return false;
    }
}