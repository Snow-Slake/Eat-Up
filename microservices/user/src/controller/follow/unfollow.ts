import { API_ROOT } from "../../config";
import { FollowControllerException } from "../exception/exception-interface";

export default function makeUnfollowController(
    followControllerException: FollowControllerException,
    { unFollow }
) {
    return async function unfollowController(request) {
        try {
            let isUnfollowed = await unFollow(
                request.body.first_id,
                request.body.second_id,
            );
            const headers = API_ROOT.api_headers;
            const statusCode = API_ROOT.api_code_success;
            const type = API_ROOT.api_code_type;
            return {
                headers: headers,
                statusCode: statusCode,
                type: type,
                body: {
                    response: isUnfollowed,
                }
            };
        } catch (exception) {
            followControllerException.unfollowControllerException(exception);
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
