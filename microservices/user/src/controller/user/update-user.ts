import { API_ROOT } from "../../config";
import { UserControllerException } from "../exception/exception-interface";

export default function makeUpdateUserController(
    UserControllerException: UserControllerException,
    { updateUser }
) {
    return async function updateUserController(request) {
        try {
            let update_user = await updateUser(
                request.body.id,
                request.body.firstName,
                request.body.lastName,
                request.body.email,
                request.body.password,
                request.body.numOfFollowers,
                request.body.numOfFollowing,
                request.body.profileImageUrl,
                request.body.coverImageUrl,
            );
            const headers = API_ROOT.api_headers;
            const statusCode = API_ROOT.api_code_success;
            const type = API_ROOT.api_code_type;
            return {
                headers: headers,
                statusCode: statusCode,
                type: type,
                body: {
                    response: update_user,
                }
            };
        } catch (exception) {
            UserControllerException.updateUserControllerException(exception);
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
