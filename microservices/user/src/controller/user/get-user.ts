import { API_ROOT } from "../../config";
import { UserControllerException } from "../exception/exception-interface";

export default function makeGetUserController(
    UserControllerException: UserControllerException,
    { getUser }
) {
    return async function getUserController(request) {
        try {
            let get_user = await getUser(
                request.body.conditions,
            );
            const headers = API_ROOT.api_headers;
            const statusCode = API_ROOT.api_code_success;
            const type = API_ROOT.api_code_type;
            return {
                headers: headers,
                statusCode: statusCode,
                type: type,
                body: {
                    response: get_user,
                }
            };
        } catch (exception) {
            UserControllerException.getUserControllerException(exception);
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
