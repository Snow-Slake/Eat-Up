import { API_ROOT } from "../../config";
import { TokenControllerException } from "../exception/exception-interface";

export default function makeGenerateTokensController(
    token_controller_exception: TokenControllerException,
    { generateTokens }
) {
    return async function generateTokenController(request) {
        try {
            const tokens = await generateTokens(
                request.body.id,
                request.body.firstName,
                request.body.lastName,
                request.body.email,
                request.body.password,
                request.body.profileImageUrl,
                request.body.coverImageUrl
            );
            const headers = API_ROOT.api_headers;
            const statusCode = API_ROOT.api_code_success;
            const type = API_ROOT.api_code_type;
            return {
                headers: headers,
                statusCode: statusCode,
                type: type,
                body: {
                    response: tokens,
                }
            };
        } catch (exception) {
            token_controller_exception.generateTokenControllerException(exception);
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
