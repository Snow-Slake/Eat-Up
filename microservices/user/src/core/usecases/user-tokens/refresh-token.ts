import { tokenManager } from "../../data-access"

export default function makeRefreshTokens() {
    return async function refreshTokens(refreshToken: string): Promise<string> {
        return await tokenManager.refreshToken(refreshToken);
    }
}