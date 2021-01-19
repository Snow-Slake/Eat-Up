import { User } from "../../entities/user";

export interface UserToken {
    generateToken(user: User): Promise<Map<string, string>>;
    refreshToken(refreshToken: string): Promise<string>;
    verifyToken(token: string): Promise<boolean>;
}