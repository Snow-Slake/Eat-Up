import { LOCAL } from "../../config";
import { UserValidators } from "./user-validator-interface";

export class IUserValidators implements UserValidators {
    vaildateEmail(email: string): boolean {
        LOCAL.EMAIL_VALIDATOR.forEach((key) => {
            if (email.includes(key)) {
                return true;
            }
        });
        return false;
    }
    vaildatePassword(password: string): boolean {
        let numOfUppercase = 0;
        let numOfLowercase = 0;
        let numOfNumber = 0;

        for (let i = 0; i < password.length; i++) {
            if (this._isUppercase(password[i])) {
                numOfUppercase++;
            } else if (this._isLowercase(password[i])) {
                numOfLowercase++;
            } else if (this._isNumber(password[i])) {
                numOfNumber++;
            }
        }

        return (
            password.length >= LOCAL.PASSWORD_VALIDATOR[LOCAL.LENGTH] &&
            numOfUppercase >= LOCAL.PASSWORD_VALIDATOR[LOCAL.UPPERCASE] &&
            numOfLowercase >= LOCAL.PASSWORD_VALIDATOR[LOCAL.LOWERCASE] &&
            numOfNumber >= LOCAL.PASSWORD_VALIDATOR[LOCAL.NUMBER]
        );
    }

    private _isUppercase(character: any): boolean {
        return character >= "A" && character <= "Z";
    }

    private _isLowercase(character: any): boolean {
        return character >= "a" && character <= "z";
    }

    private _isNumber(number: any): boolean {
        return number >= "0" && number <= "9";
    }
}
