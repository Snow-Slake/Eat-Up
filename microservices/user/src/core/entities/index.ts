import { buildMakeUser } from "./user-factory";
import { UserValidators } from "./user-factory";

class Validator implements UserValidators {
    vaildateEmail(email: string): boolean {
        throw new Error("Method not implemented.");
    }
    vaildatePassword(password: string): boolean {
        throw new Error("Method not implemented.");
    }
}

export const makeUser = buildMakeUser(new Validator());
