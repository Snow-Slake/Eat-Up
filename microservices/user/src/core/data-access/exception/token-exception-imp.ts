import { TokenException } from "./exception-interface";

export default class ITokenException implements TokenException {
    generateTokensException(exception: string): void {
        console.log('generate token throw exception: ' + exception);
    }
    refreshTokensException(exception: string): void {
        console.log('refresh token throw exception: ' + exception);
    }
    verifyTokensException(exception: string): void {
        console.log('verify token throw exception: ' + exception);
    }
}