import { userDb } from ".";
import { User } from "../entities/user";
import { DATABASE } from "../../config";
import { makeUser } from "../entities";

var t = 1;
var fail_flag = false;

describe("testing user db operations", () => {
    let current_inserted_users: User[] = [];
    let current_num_of_users_in_database = 0;
    beforeAll( async () => {
        const current_users = await userDb.get([]);
        current_num_of_users_in_database = current_users.length;
    });

    beforeEach(async () => {
        console.log("Running on test " + t++);
        
        fail_flag = false;

        if (current_inserted_users != null) {
            for (let i = 0; i < current_inserted_users.length; i++) {
                await userDb.delete(current_inserted_users[i]);
            }
        }
        current_inserted_users = [];
    });

    it("Test insert user", async () => {
        let user = makeUser(new User('1', "mo", "medo", "xx@gmail.com", "aaaa11AA", "xxx", "aaaa11AAy", 0, 0));
        let added = await userDb.insert(user);
        expect(added).toBe(true);
        current_inserted_users.push(user)
    });

    it("Test insert, delete and get users", async () => {
        let users: User[] = [];

        users.push(new User('1', "mo", "medo", "xx@gmail.com", "aaaa11AA", "xxx", "aaaa11AAy", 0, 0));
        users.push(new User('2', "mo", "medo", "xx@gmail.com", "aaaa11AA", "xxx", "aaaa11AAy", 0, 0));
        users.push(new User('3', "mo", "medo", "xx@gmail.com", "aaaa11AA", "xxx", "aaaa11AAy", 0, 0));
        
        await userDb.insert(users[0]);
        await userDb.insert(users[1]);
        await userDb.insert(users[2]);

        let current_users = await userDb.get([DATABASE.USER_ID_ENTRY, users[0].id]);
        current_users.push((await userDb.get([DATABASE.USER_ID_ENTRY, users[1].id]))[0]);
        current_users.push((await userDb.get([DATABASE.USER_ID_ENTRY, users[2].id]))[0]);
        let exist = false;

        expect(current_users.length).toBe(3);
        
        await userDb.delete(current_users[0]);
        await userDb.delete(current_users[1]);

        current_users = await userDb.get([DATABASE.USER_ID_ENTRY, current_users[2].id]);

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

        expect(current_users.length).toBe(current_num_of_users_in_database + 0);
    });

    it("Test all user operatons", async () => {
        let users: User[] = [];
        let IDs: string[] = [];

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

        let current_users: User[] = [];
        let conditions: string[] = [];

        conditions.push(DATABASE.USER_ID_ENTRY);
        conditions.push(users[3].id);

        current_users = await userDb.get(conditions);

        expect(current_users.length).toBe(1);
        expect(current_users[0].email).toBe(users[3].email);

        current_users = await userDb.get([]);
        
        expect(current_users.length).toBe(current_num_of_users_in_database + 3);
        
        await userDb.delete(current_users[0]);
        await userDb.delete(current_users[1]);

        current_users = await userDb.get([]);

        expect(current_users.length).toBe(current_num_of_users_in_database + 1);

        await userDb.delete(current_users[0]);

        current_users = await userDb.get([]);

        expect(current_users.length).toBe(current_num_of_users_in_database + 0);
    });

    afterEach(() => {
        if (fail_flag) {
            console.log("wrong answer in test " + t);
        }
    });

    afterAll(async () => {
        console.log("All tests done!!");

        if (current_inserted_users != null) {
            for (let i = 0; i < current_inserted_users.length; i++) {
                await userDb.delete(current_inserted_users[i]);
            }
        }
    });
});
