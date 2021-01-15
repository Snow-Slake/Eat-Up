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
        return this.__ingredients ? new Map(this.__ingredients) : undefined;
    }

    public updateIngredient(name: string, capacity: number, unit: string) {
        this.__ingredients[name] = { capacity, unit };
    }

    public deleteIngredient(name: string): boolean {
        return this.__ingredients.delete(name);
    }

    public toJson(): {
        id: string;
        ingredients: Map<string, { capacity: number; unit: string }> | undefined;
    } {
        return {
            id: this.id,
            ingredients: this.ingredients,
        };
    }
}
