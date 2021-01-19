import { tokenManager } from "../../data-access"

export default function makeVerifyTokens() {
    return async function verifyTokens(token: string): Promise<boolean> {
        return await tokenManager.verifyToken(token);
    }
}