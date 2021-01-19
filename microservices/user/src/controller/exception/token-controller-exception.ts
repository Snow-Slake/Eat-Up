import { TokenControllerException } from "./exception-interface";

export default class ITokenControllerException implements TokenControllerException {
    generateTokenControllerException(exception: string): void {
        console.log('generate Token controller throw exception: ' + exception);
    }
    refreshTokenControllerException(exception: string): void {
        console.log('refresh Token controller throw exception: ' + exception);
    }
    verifyTokenControllerException(exception: string): void {
        console.log('verify Token controller throw exception: ' + exception);
    }
}