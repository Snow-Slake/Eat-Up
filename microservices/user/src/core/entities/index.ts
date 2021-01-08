import { buildMakeUser } from "./user-factory";
import { IUserValidators } from "./user-validator-imp";
import { IValidatorException } from "./exception/validator-exception-imp";

export const makeUser = buildMakeUser(new IUserValidators(), new IValidatorException());
