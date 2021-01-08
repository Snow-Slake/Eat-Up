import { ValidatorException } from "./exception-interface";

export class IValidatorException implements ValidatorException {
    emailException(): string {
        throw new Error("Email validator function throw exception: Email not valid!!");
    }
    passwordException(): string {
        throw new Error("Password validator function throw exception: Password not valid!!");
    }
}
