import { DATABASE } from "../../config";

export class Fridge {
    private __id: string; // fridge_id which is user id
    private __ingredients: Map<string, { capacity: number; unit: string }>;

    constructor(id: string, ingredients: Map<string, { capacity: number; unit: string }>) {
        this.__id = id;
        this.__ingredients = ingredients;
    }

    get id(): string {
        return this.__id;
    }

    get userId(): string {
        return this.__id;
    }

    get ingredients(): Map<string, { capacity: number; unit: string }> | undefined {
        return this.__ingredients ? this.__ingredients : undefined;
    }

    // methods that start with "_" are only allowed to be used in package scope
    public _updateIngredient(name: string, capacity: number, unit: string) {
        this.__ingredients[name] = { capacity, unit };
    }

    public deleteIngredient(name: string): boolean {
        return this.__ingredients.delete(name);
    }

    toJson = () => {
        let fridge = {};
        let ingredient = {};

        if (this.ingredients === undefined) {
            return {};
        }

        this.ingredients.forEach((value, key) => {
            ingredient[key] = {
                capacity: value.capacity,
                unit: value.unit,
            };
        });

        fridge[DATABASE.FRIDGE_ID_ENTRY] = this.id;
        fridge[DATABASE.FRIDGE_INGREDIENT_ENTRY] = ingredient;
        return fridge;
    }
}
