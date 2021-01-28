import { Fridge } from "./fridge";

export function buildMakeFridge() {
    return async function (
        id: string,
        ingredients: Array<string>,
        capacities: Array<number>,
        units: Array<string>
    ): Promise<Fridge> {
        let fridge_ingredient = new Map();

        for (let i = 0; i < ingredients.length; i++) {
            fridge_ingredient.set(ingredients[i], {
                capacity: capacities[i],
                unit: units[i],
            });
        }

        return new Fridge(id, fridge_ingredient);
    };
}
