import { tokenManager } from ".";
import { LOCAL } from "../../config";
import { User } from "../entities/user";

var t = 1;
var fail_flag = false;

describe("testing Token manager operations", () => {
    jest.setTimeout(60000);
    
    beforeAll(async () => {
        sleep(20 * 1000);
    });

    beforeEach(async () => {
        console.log("Running on test " + t++);
        fail_flag = false;
    });

    function sleep(milliseconds) {
        const date = Date.now();
        let currentDate = 0;
        do {
            currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    }

    it("Test all operation", async () => {
        const user = new User("xx", "medo", "medo", "xxx@gmail.com", "yyy", "sss", "aaa", 0, 0);
        let tokens = await tokenManager.generateToken(user);

        expect(tokens[LOCAL.ACCESS_TOKEN].length).toBeGreaterThan(0);

        // Uncomment only when run locally and don't forget to change env timelimit
        // Last result locally in 19 jan 2021 is passed successfully.
        
        /*
        sleep(10000);

        let isVerified = await tokenManager.verifyToken(tokens[LOCAL.ACCESS_TOKEN]);

        expect(isVerified).toBe(false);

        tokens[LOCAL.ACCESS_TOKEN] = '';
        tokens[LOCAL.ACCESS_TOKEN] = await tokenManager.refreshToken(tokens[LOCAL.REFRESH_TOKEN]);

        expect(tokens[LOCAL.ACCESS_TOKEN].length).toBeGreaterThan(0);

        sleep(10000);

        let access_verified = await tokenManager.verifyToken(tokens[LOCAL.ACCESS_TOKEN]);
        let refresh_verified = await tokenManager.verifyToken(tokens[LOCAL.REFRESH_TOKEN]);

        expect(access_verified).toBe(false);
        expect(refresh_verified).toBe(false);
        */
    });

    afterEach(() => {
        if (fail_flag) {
            console.log("wrong answer in test " + t);
        }
    });

    afterAll(async () => {
        console.log("All tests done!!");
    });
});
