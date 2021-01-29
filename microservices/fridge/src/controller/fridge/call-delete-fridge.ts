import { HEADERS, RESPONSE_TYPE, STATUS_CODE_SUCCESS } from "../../config";
import { FridgeControllerException } from "./exception/exception-interface";

export default function makeDeleteFridgeController(
    FridgeControllerException: FridgeControllerException,
    { deleteFridge }
) {
    return async function deleteFridgeController(request) {
        try {
            const delete_fridge = deleteFridge(
                request.body.id,
            );
            const headers = HEADERS;
            const statusCode = STATUS_CODE_SUCCESS;
            const type = RESPONSE_TYPE;
            return {
                headers: headers,
                statusCode: statusCode,
                type: type,
                body: {
                    response: delete_fridge,
                }
            };
        } catch (exception) {
            FridgeControllerException.deleteException(exception);
            const headers = HEADERS;
            const statusCode = STATUS_CODE_SUCCESS;
            const type = RESPONSE_TYPE;
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
