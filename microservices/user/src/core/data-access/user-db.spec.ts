import { userDb } from ".";
import { User } from "../entities/user";
import { DATABASE } from "../../config";

var t = 1;
var fail_flag = false;

describe("testing user db operations", () => {
    beforeEach(async () => {
        console.log("Running on test " + t++);
        
        fail_flag = false;
        let current_users = await userDb.get([]);

        if (current_users != null) {
            for (let i = 0; i < current_users.length; i++) {
                await userDb.delete(current_users[i]);
            }
        }
    });

    it("Test insert user", async () => {
        let added = await userDb.insert(
            new User('1', "mo", "medo", "xx@gmail.com", "aaaa11AA", "xxx", "aaaa11AAy", 0, 0)
        );

        expect(added).toBe(true);
    });

    it("Test insert, delete and get users", async () => {
        let users = [];

        users.push(new User('1', "mo", "medo", "xx@gmail.com", "aaaa11AA", "xxx", "aaaa11AAy", 0, 0));
        users.push(new User('2', "mo", "medo", "xx@gmail.com", "aaaa11AA", "xxx", "aaaa11AAy", 0, 0));
        users.push(new User('3', "mo", "medo", "xx@gmail.com", "aaaa11AA", "xxx", "aaaa11AAy", 0, 0));
        
        await userDb.insert(users[0]);
        await userDb.insert(users[1]);
        await userDb.insert(users[2]);

        let current_users = await userDb.get([]);
        let exist = false;

        expect(current_users.length).toBe(3);
        
        await userDb.delete(current_users[0]);
        await userDb.delete(current_users[1]);

        current_users = await userDb.get([]);

        for (let i = 0; i < users.length; i++) {
            if (current_users[0].id === users[i].id) {
                exist = true;
                break;
            }
        }

        expect(current_users.length).toBe(1);
        expect(exist).toBe(true);

        await userDb.delete(current_users[0]);

        current_users = await userDb.get([]);

        expect(current_users.length).toBe(0);
    });

    it("Test all user operatons", async () => {
        let users = [];
        let IDs = [];

        IDs.push('1');
        IDs.push('2');
        IDs.push('3');

        users.push(new User(IDs[0], "mo", "medo", "xx@gmail.com", "aaaa11AA", "xxx", "aaaa11AAy", 0, 0));
        users.push(new User(IDs[1], "mo", "medo", "xx@gmail.com", "aaaa11AA", "xxx", "aaaa11AAy", 0, 0));
        users.push(new User(IDs[2], "mo", "medo", "xx@gmail.com", "aaaa11AA", "xxx", "aaaa11AAy", 0, 0));
        
        await userDb.insert(users[0]);
        await userDb.insert(users[1]);
        await userDb.insert(users[2]);

        // update last two users
        users.push(new User(IDs[1], "mo", "medo", "medo@gmail.com", "aaaa11AA", "xxx", "aaaa11AAy", 0, 0));
        users.push(new User(IDs[2], "mo", "medo", "kun@gmail.com", "aaaa11AA", "xxx", "aaaa11AAy", 0, 0));

        await userDb.update(users[3]);
        await userDb.update(users[4]);

        let current_users = [];
        let conditions = [];

        conditions.push(DATABASE.USER_ID_ENTRY);
        conditions.push(users[3].id);

        current_users = await userDb.get(conditions);

        expect(current_users.length).toBe(1);
        expect(current_users[0].email).toBe(users[3].email);

        current_users = await userDb.get([]);
        
        expect(current_users.length).toBe(3);
        
        await userDb.delete(current_users[0]);
        await userDb.delete(current_users[1]);

        current_users = await userDb.get([]);

        expect(current_users.length).toBe(1);

        await userDb.delete(current_users[0]);

        current_users = await userDb.get([]);

        expect(current_users.length).toBe(0);
    });

    afterEach(() => {
        if (fail_flag) {
            console.log("wrong answer in test " + t);
        }
    });

    afterAll(async () => {
        console.log("All tests done!!");

        let current_users = await userDb.get([]);

        if (current_users != null) {
            for (let i = 0; i < current_users.length; i++) {
                await userDb.delete(current_users[i]);
            }
        }
    });
});
