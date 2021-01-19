import { LOCAL } from "../../config";
import { User } from "../entities/user";
import { UserToken } from "../usecases/user-tokens/user-token-interface";
import jwt from "jsonwebtoken";
import { TokenException } from "./exception";

export default class TokenManager implements UserToken {
    constructor(private _token_exceptions: TokenException) {}
    async generateToken(user: User): Promise<Map<string, string>> {
        try {
            let token = new Map<string, string>();
            token[LOCAL.ACCESS_TOKEN] = jwt.sign(user, LOCAL.ENV_ACCESS_TOKEN, {
                expiresIn: LOCAL.ACCESS_TOKEN_TIMELIMT,
            });
            token[LOCAL.REFRESH_TOKEN] = jwt.sign(user, LOCAL.ENV_REFRESH_TOKEN, {
                expiresIn: LOCAL.REFRESH_TOKEN_TIMELIMT,
            });
            return token;
        } catch (exception) {
            this._token_exceptions.generateTokensException(exception);
            return null as any;
        }
    }
    async refreshToken(refreshToken: string): Promise<string> {
        try {
            let access_token = "";
            jwt.verify(refreshToken, LOCAL.ENV_REFRESH_TOKEN, (error, user) => {
                if (!error || user !== undefined || user !== null) {
                    return null as any;
                }
                access_token = jwt.sign(user, LOCAL.ENV_ACCESS_TOKEN, {
                    expiresIn: LOCAL.ACCESS_TOKEN_TIMELIMT,
                });
            });
            if (access_token.length === 0) return null as any;
            return access_token;
        } catch (exception) {
            this._token_exceptions.refreshTokensException(exception);
            return null as any;
        }
    }
    async verifyToken(token: string): Promise<boolean> {
        try {
            let access_token = "";
            jwt.verify(token, LOCAL.ENV_ACCESS_TOKEN, (error, user) => {
                if (!error || user !== undefined || user !== null) {
                    return false;
                }
                access_token = token;
            });
            if (access_token.length === 0) return false;
            return true;
        } catch (exception) {
            this._token_exceptions.verifyTokensException(exception);
            return false;
        }
    }
}
