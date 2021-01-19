import { API_ROOT } from "../../config";
import { TokenControllerException } from "../exception/exception-interface";

export default function makerefreshTokensController(
    token_controller_exception: TokenControllerException,
    { refreshTokens }
) {
    return async function refreshTokensController(request) {
        try {
            const access_token = await refreshTokens(request.body.refresh_token);
            const headers = API_ROOT.api_headers;
            const statusCode = API_ROOT.api_code_success;
            const type = API_ROOT.api_code_type;
            return {
                headers: headers,
                statusCode: statusCode,
                type: type,
                body: {
                    response: access_token,
                },
            };
        } catch (exception) {
            token_controller_exception.refreshTokenControllerException(exception);
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
