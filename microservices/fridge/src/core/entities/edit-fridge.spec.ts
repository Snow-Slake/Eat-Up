import { makeFridge } from "."


describe("Testing creating fridge", () => {

    it("Test creating valid fridge", async() => {
        const id = "1";
        const ingredients_names = new Array<string>(...["tomatos", "potats", "chocolate"]);
        const capacities = new Array<number>(...[0, 1, 2]);
        const units = new Array<string>(...["k.g", "k.g", "pieces"]);
        const ret = await makeFridge(id, ingredients_names, capacities, units);

        expect(ret).toBeDefined();
        expect(ret?.id).toEqual(id);
        
        const ret_ingredients = ret?.ingredients;
        expect(ret_ingredients).toBeDefined();
        if(ret_ingredients) {
            expect(ret_ingredients.keys.length).toEqual(ingredients_names.length);
            for(let [name, val] of ret_ingredients) {
                expect(ingredients_names).toContain(name);
                expect(capacities).toContain(val.capacity);
                expect(units).toContain(val.unit);
            }
        }

        const ret_json = ret?.toJson();
        expect(ret_json).toBeDefined();
        if(ret_json) {
            expect(ret_json.id).toEqual(id);
            if(ret_json.ingredients) {
                expect(ret_json.ingredients.keys.length).toEqual(ingredients_names.length);
                for(let [name, val] of ret_json.ingredients) {
                    expect(ingredients_names).toContain(name);
                    expect(capacities).toContain(val.capacity);
                    expect(units).toContain(val.unit);
                }
            }
        }
    });
});