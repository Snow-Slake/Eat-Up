import { cache_manager } from ".";

describe("Testing cache connection", () => {
    it("Test cache set and get", async () => {
        let key = 'xx';
        let value = {};

        value['id'] = 'aa';
        value['name'] = 'medoKun';

        let ret = await cache_manager.set(key, value);
        expect(ret).toBe(true);

        let reValue = {};

        key = 'yy';
        reValue['id'] = 'ss';
        reValue['name'] = 'amin';

        ret = await cache_manager.set(key, reValue);
        expect(ret).toBe(true);

        const v1 = await cache_manager.get('xx');
        const v2 = await cache_manager.get('yy');
        const v3 = await cache_manager.get('xxx');

        expect(JSON.stringify(v1)).toBe(JSON.stringify(value));
        expect(JSON.stringify(v2)).toBe(JSON.stringify(reValue));
        expect(v3).toBe(null);
    });
});
