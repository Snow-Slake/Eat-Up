import { DATABASE, LOCAL } from "../../config";
import { User } from "../entities/user";
import { UserToken } from "../usecases/user-tokens/user-token-interface";
import jwt from "jsonwebtoken";
import { TokenException } from "./exception";

export default class TokenManager implements UserToken {
    constructor(private _token_exceptions: TokenException) {}
    async generateToken(user: User): Promise<Map<string, string>> {
        try {
            let token = new Map<string, string>();
            token[LOCAL.ACCESS_TOKEN] = jwt.sign(
                {
                    ID: user.id,
                    FIRST_NAME: user.firstName,
                    LAST_NAME: user.lastName,
                    EMAIL: user.email,
                    PASSWORD: user.password,
                    COVER_IMAGE: user.coverImageUrl,
                    FOLLOWER: user.numOfFollowers,
                    FOLLOWING: user.numOfFollowing,
                    PROFILE_IMAGE: user.profileImageUrl,
                },
                LOCAL.ENV_ACCESS_TOKEN,
                {
                    expiresIn: LOCAL.ACCESS_TOKEN_TIMELIMT,
                }
            );
            token[LOCAL.REFRESH_TOKEN] = jwt.sign(
                {
                    ID: user.id,
                    FIRST_NAME: user.firstName,
                    LAST_NAME: user.lastName,
                    EMAIL: user.email,
                    PASSWORD: user.password,
                    COVER_IMAGE: user.coverImageUrl,
                    FOLLOWER: user.numOfFollowers,
                    FOLLOWING: user.numOfFollowing,
                    PROFILE_IMAGE: user.profileImageUrl,
                },
                LOCAL.ENV_REFRESH_TOKEN,
                {
                    expiresIn: LOCAL.REFRESH_TOKEN_TIMELIMT,
                }
            );
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
                if (error !== null || user === undefined || user === null) {
                    return null as any;
                }
                access_token = jwt.sign(
                    {
                        ID: user[DATABASE.USER_ID_ENTRY],
                        FIRST_NAME: user[DATABASE.USER_FIRST_NAME_ENTRY],
                        LAST_NAME: user[DATABASE.USER_LAST_NAME_ENTRY],
                        EMAIL: user[DATABASE.USER_EMAIL_ENTRY],
                        PASSWORD: user[DATABASE.USER_PASSWORD_ENTRY],
                        COVER_IMAGE: user[DATABASE.USER_COVER_IMAGE_ENTRY],
                        FOLLOWER: user[DATABASE.USER_FOLLOWER_ENTRY],
                        FOLLOWING: user[DATABASE.USER_FOLLOWING_ENTRY],
                        PROFILE_IMAGE: user[DATABASE.USER_PROFILE_IMAGE_ENTRY],
                    },
                    LOCAL.ENV_ACCESS_TOKEN,
                    {
                        expiresIn: LOCAL.ACCESS_TOKEN_TIMELIMT,
                    }
                );
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
            jwt.verify(token, LOCAL.ENV_ACCESS_TOKEN, (error, user) => {
                if (error !== null || user === undefined || user === null) {
                    return false;
                }
                return true;
            });
            return false;
        } catch (exception) {
            this._token_exceptions.verifyTokensException(exception);
            return false;
        }
    }
}
