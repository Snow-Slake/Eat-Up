export interface UserValidators {
    vaildateEmail(email: string): boolean;
    vaildatePassword(password: string): boolean;
}
