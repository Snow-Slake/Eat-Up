import { API_ROOT } from "../../config";
import { TokenControllerException } from "../exception/exception-interface";

export default function makeverifyTokenController(
    token_controller_exception: TokenControllerException,
    { verifyTokens }
) {
    return async function verifyTokenController(request) {
        try {
            const isVerified = verifyTokens(request.body.access_token);
            const headers = API_ROOT.api_headers;
            const statusCode = API_ROOT.api_code_success;
            const type = API_ROOT.api_code_type;
            return {
                headers: headers,
                statusCode: statusCode,
                type: type,
                body: {
                    response: isVerified,
                },
            };
        } catch (exception) {
            token_controller_exception.verifyTokenControllerException(exception);
            const headers = API_ROOT.api_headers;
            const statusCode = API_ROOT.api_code_fail;
            const type = API_ROOT.api_code_type;
            return {
                headers: headers,
                statusCode: statusCode,
                type: type,
                body: {
                    exception: exception,
                },
            };
        }
    };
}
