import * as uuid from "uuid";
import { addFridge, deleteFridge, getFridge, updateFridge } from "../usecases";

describe("Testing fridge", () => {
    it("Test fridge operation", async () => {
        const id = uuid.v4();
        const ingredients = new Array<string>(...["tomatos", "potats", "chocolate"]);
        const capacities = new Array<number>(...[0, 1, 2]);
        const units = new Array<string>(...["k.g", "k.g", "pieces"]);
        const ret = await addFridge(id, ingredients, capacities, units);
        //---------------------------------------------------------------------------------//
        const uid = uuid.v4();
        const uingredients = new Array<string>(...["tomatos", "potats", "chocolate"]);
        const ucapacities = new Array<number>(...[0, 1, 2]);
        const uunits = new Array<string>(...["k.g", "k.g", "pieces"]);
        const uret = await addFridge(uid, uingredients, ucapacities, uunits);

        expect(ret).toBe(true);
        expect(uret).toBe(true);

        let fridge = await getFridge(id);
        
        expect(fridge?.id).toBe(id);
        
        let c = 0;

        fridge?.ingredients?.forEach((value, key) => {
            c++;
            expect(ingredients).toContain(key);
            expect(capacities).toContain(value.capacity);
            expect(units).toContain(value.unit);
        });
        expect(c).toEqual(ingredients.length);
        
        ingredients.pop(), units.pop(), capacities.pop();

        const isUpdated = await updateFridge(id, ingredients, capacities, units);

        expect(isUpdated).toBe(true);

        fridge = await getFridge(id);

        expect(fridge?.id).toBe(id);
        expect(fridge).toBeDefined();

        c = 0;
        if (fridge?.ingredients != undefined) {
            fridge.ingredients.forEach((value, key) => {
                c++;
                expect(ingredients).toContain(key);
                expect(capacities).toContain(value.capacity);
                expect(units).toContain(value.unit);
            });
            expect(c).toBe(ingredients.length);
        }

        let isDeleted = await deleteFridge(id);
        expect(isDeleted).toBe(true);

        isDeleted = await deleteFridge(uid);
        expect(isDeleted).toBe(true);

        fridge = await getFridge(id);
        expect(fridge).toBeUndefined();
    });
});
