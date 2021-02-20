import { cache_manager } from ".";
import { makePost } from "../entities";

describe("Testing cache connection", () => {
    jest.setTimeout(10000);
    it("Test cache set and get", async () => {
        let id = 'YYXX';
        let current_post = makePost(id, "XX", "xx", ["sas"], ["sadas"], "asd", 55, {
            ingredients: ["sad"],
            nutritions: ["asd"],
            steps: ["asdas"],
        });
        const emp_post = await cache_manager.get(id);
        const isSet = await cache_manager.set(id, current_post);
        const post = await cache_manager.get(id);
        const isDel = await cache_manager.del(id);
        const cur_emp_post = await cache_manager.get(id);

        expect(emp_post).toBe(null);
        expect(cur_emp_post).toBe(null);
        expect(isSet).toBe(true);
        expect(isDel).toBe(true);
        expect(post.id).toBe(current_post.id);
        expect(post.postContent?.ingredients).toBe(current_post.postContent?.ingredients);
        expect(post.tags).toBe(current_post.tags);
    });
});
