import { API_ROOT } from "../../config";
import { UserControllerException } from "../exception/exception-interface";
import * as uuid from "uuid";

export default function makeAddUserController(
    UserControllerException: UserControllerException,
    { addUser }
) {
    return async function addUserController(request) {
        try {
            let add_user = await addUser(
                uuid.v4(),
                request.body.firstName,
                request.body.lastName,
                request.body.email,
                request.body.password,
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
                    response: add_user,
                }
            };
        } catch (exception) {
            UserControllerException.addUserControllerException(exception);
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
