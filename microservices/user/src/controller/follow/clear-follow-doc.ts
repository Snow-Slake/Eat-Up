import { API_ROOT } from "../../config";
import { FollowControllerException } from "../exception/exception-interface";

export default function makeClearFollowDocController(
    followControllerException: FollowControllerException,
    { clearFollow }
) {
    return async function clearFollowDocController(request) {
        try {
            let isCleared = await clearFollow(
                request.body.user_id,
            );
            const headers = API_ROOT.api_headers;
            const statusCode = API_ROOT.api_code_success;
            const type = API_ROOT.api_code_type;
            return {
                headers: headers,
                statusCode: statusCode,
                type: type,
                body: {
                    response: isCleared,
                }
            };
        } catch (exception) {
            followControllerException.clearFollowDocControllerException(exception);
            const headers = API_ROOT.api_headers;
            const statusCode = API_ROOT.api_code_fail;
            const type = API_ROOT.api_code_type;
            return {
                headers: headers,
                statusCode: statusCode,
                type: type,
                body: {
                    exception: exception,
                }
            };
        }
    };
}
