import * as uuid from 'uuid'

import { addFridge, updateFridge, getFridge } from '..'


describe("Testing updating fridge", () => {
    it("Test updating valid fridge", async() => {
        const id = uuid.v4();
        const ingredients_names = new Array<string>(...["tomatos", "potats", "chocolate"]);
        const capacities = new Array<number>(...[0, 1, 2]);
        const units = new Array<string>(...["k.g", "k.g", "pieces"]);
        let ret = await addFridge(id, ingredients_names, capacities, units);

        expect(ret).toBeDefined();
        expect(ret?.id).toEqual(id);
        expect(ret?.id).toEqual(ret?.userId);
        
        if(ret) {
            const updated = await updateFridge(ret.id, "tomatos", {capcity: 5});
            capacities[0] = 5;
            expect(updated).toBeTruthy();
        }
        else {
            fail()
        }

        ret = await getFridge(id);
        expect(ret?.id).toEqual(ret?.userId);
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

    it("Test updating fidge with invalid id", async() => {
        const id = uuid.v4();
        let updated = await updateFridge(id, "tomatos", {capcity: -1});
        expect(updated).toBeFalsy();
    });

    it("Test updating valid fridge with invaild data", async() => {
        const id = uuid.v4();
        const ingredients_names = new Array<string>(...["tomatos", "potats", "chocolate"]);
        const capacities = new Array<number>(...[0, 1, 2]);
        const units = new Array<string>(...["k.g", "k.g", "pieces"]);
        let ret = await addFridge(id, ingredients_names, capacities, units);

        expect(ret).toBeDefined();
        expect(ret?.id).toEqual(id);
        expect(ret?.id).toEqual(ret?.userId);
        
        if(ret) {
            const temp = ret;
            let updated = await updateFridge(temp.id, "tomatos", {capcity: -1});
            expect(updated).toBeFalsy();

            updated = await updateFridge(temp.id, "tomatos", {});
            expect(updated).toBeFalsy();

            updated = await updateFridge(temp.id, "tomatos", {unit: ""});
            expect(updated).toBeFalsy();
        }
        else {
            fail()
        }

    });
});