import * as uuid from 'uuid'
import { deleteFridge, addFridge } from '..'


describe("Testing deleting fridge", () => {
    it("Test deleting valid fridge", async() => {
        const id = uuid.v4();
        const ingredients_names = new Array<string>(...["tomatos", "potats", "chocolate"]);
        const capacities = new Array<number>(...[0, 1, 2]);
        const units = new Array<string>(...["k.g", "k.g", "pieces"]);
        let ret = await addFridge(id, ingredients_names, capacities, units);
        expect(ret).toBeDefined();

        const deleted = await deleteFridge(id);
        expect(deleted).toBeTruthy();
    });

    it("Test deleting invalid fridge", async() => {
        const id = uuid.v4();
        const deleted = await deleteFridge(id);
        expect(deleted).toBeFalsy();
    });

});