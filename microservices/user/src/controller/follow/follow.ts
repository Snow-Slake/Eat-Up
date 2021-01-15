import { API_ROOT } from "../../config";
import { FollowControllerException } from "../exception/exception-interface";

export default function makeFollowController(
    followControllerException: FollowControllerException,
    { follow }
) {
    return async function followController(request) {
        try {
            let isFollowed = await follow(
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
                    response: isFollowed,
                }
            };
        } catch (exception) {
            followControllerException.followControllerException(exception);
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
