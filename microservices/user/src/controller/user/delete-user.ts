import { API_ROOT } from "../../config";
import { UserControllerException } from "../exception/exception-interface";

export default function makeDeleteUserController(
    UserControllerException: UserControllerException,
    { deleteUser }
) {
    return async function deleteUserController(request) {
        try {
            let delete_user = await deleteUser(
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
                    response: delete_user,
                }
            };
        } catch (exception) {
            UserControllerException.deleteUserControllerException(exception);
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
    }
}
