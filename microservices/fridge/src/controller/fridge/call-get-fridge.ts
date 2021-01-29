import { HEADERS, RESPONSE_TYPE, STATUS_CODE_SUCCESS } from "../../config";
import { FridgeControllerException } from "./exception/exception-interface";

export default function makeGetFridgeController(
    FridgeControllerException: FridgeControllerException,
    { getFridge }
) {
    return async function getFridgeController(request) {
        try {
            const get_fridge = getFridge(
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
                    response: get_fridge,
                }
            };
        } catch (exception) {
            FridgeControllerException.getException(exception);
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
