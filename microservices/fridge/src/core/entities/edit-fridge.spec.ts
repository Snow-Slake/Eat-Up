import { makeFridge, editFridge } from "."


describe("Testing editing fridge", () => {
    it("Test updating valid fridge", async() => {
        const id = "1";
        const ingredients_names = new Array<string>(...["tomatos", "potats", "chocolate"]);
        const capacities = new Array<number>(...[0, 1, 2]);
        const units = new Array<string>(...["k.g", "k.g", "pieces"]);
        let ret = await makeFridge(id, ingredients_names, capacities, units);

        expect(ret).toBeDefined();
        expect(ret?.id).toEqual(id);
        expect(ret?.id).toEqual(ret?.userId);
        
        if(ret) {
            const updated = await editFridge(ret.id, "tomatos", {capcity: 5});
            expect(updated).toBeTruthy();
        }
        else {
            fail()
        }
    });

    it("Test updating valid fridge with invaild data", async() => {
        const id = "1";
        const ingredients_names = new Array<string>(...["tomatos", "potats", "chocolate"]);
        const capacities = new Array<number>(...[0, 1, 2]);
        const units = new Array<string>(...["k.g", "k.g", "pieces"]);
        let ret = await makeFridge(id, ingredients_names, capacities, units);

        expect(ret).toBeDefined();
        expect(ret?.id).toEqual(id);
        expect(ret?.id).toEqual(ret?.userId);
        
        if(ret) {
            const temp = ret;
            let updated = await editFridge(temp.id, "tomatos", {capcity: -1});
            expect(updated).toBeFalsy();

            updated = await editFridge(temp.id, "tomatos", {});
            expect(updated).toBeFalsy();

            updated = await editFridge(temp.id, "tomatos", {unit: ""});
            expect(updated).toBeFalsy();
        }
        else {
            fail()
        }

    });

    it("Test deleting from valid fridge", async() => {
        const id = "1";
        let ingredients_names = new Array<string>(...["tomatos", "potats", "chocolate"]);
        let capacities = new Array<number>(...[0, 1, 2]);
        let units = new Array<string>(...["k.g", "k.g", "pieces"]);
        const ret = await makeFridge(id, ingredients_names, capacities, units);

        expect(ret).toBeDefined();
        expect(ret?.id).toEqual(id);
        expect(ret?.id).toEqual(ret?.userId);
        
        const update = ret?.deleteIngredient("tomatos");
        expect(update).toBeTruthy();
        capacities = capacities.slice(1);
        ingredients_names = ingredients_names.slice(1);
        units = units.slice(1);

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