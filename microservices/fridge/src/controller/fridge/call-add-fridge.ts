import { HEADERS, RESPONSE_TYPE, STATUS_CODE_SUCCESS } from "../../config";
import { FridgeControllerException } from "./exception/exception-interface";

export default function makeAddFridgeController(
    FridgeControllerException: FridgeControllerException,
    { addFridge }
) {
    return async function addFridgeController(request) {
        try {
            const add_fridge = await addFridge(
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
                    response: add_fridge,
                }
            };
        } catch (exception) {
            FridgeControllerException.insertException(exception);
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
