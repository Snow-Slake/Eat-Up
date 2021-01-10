import { ValidatorException } from "./exception-interface";

export class IValidatorException implements ValidatorException {
    emailException(): void {
        console.log("Email validator function throw exception: Email not valid!!");
    }
    passwordException(): void {
        console.log("Password validator function throw exception: Password not valid!!");
    }
}
