import { HEADERS, RESPONSE_TYPE, STATUS_CODE_SUCCESS } from "../../config";
import { FridgeControllerException } from "./exception/exception-interface";

export default function makeUpdateFridgeController(
    FridgeControllerException: FridgeControllerException,
    { updateFridge }
) {
    return async function updateFridgeController(request) {
        try {
            const update_fridge = updateFridge(
                request.body.id,
                request.body.ingredients,
                request.body.capacities,
                request.body.units,
            );
            const headers = HEADERS;
            const statusCode = STATUS_CODE_SUCCESS;
            const type = RESPONSE_TYPE;
            return {
                headers: headers,
                statusCode: statusCode,
                type: type,
                body: {
                    response: update_fridge,
                }
            };
        } catch (exception) {
            FridgeControllerException.updateException(exception);
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
