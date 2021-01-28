import { imageManager } from '.';
import * as constants from '../../config/local-test-constant';

describe("Testing Image uploader", () => {
    it("Test Image Operation", async () => {
        let path = constants.FILE_NAME;
        let destination = 'images/XX/panda.jpg';

        const url = await imageManager.uploadPublicFile(path, destination);
        expect(url.length).toBeGreaterThan(0);

        const flag = await imageManager.delete(destination);
        expect(flag).toBe(true);
    });
});
