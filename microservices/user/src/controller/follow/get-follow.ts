import { API_ROOT } from "../../config";
import { FollowControllerException } from "../exception/exception-interface";

export default function makeGetFollowController(
    followControllerException: FollowControllerException,
    { getFollow }
) {
    return async function getFollowController(request) {
        try {
            let users = await getFollow(
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
                    response: users,
                }
            };
        } catch (exception) {
            followControllerException.getFollowControllerException(exception);
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
