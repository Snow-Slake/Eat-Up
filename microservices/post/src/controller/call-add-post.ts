import * as uuid from "uuid";
import { HEADERS, RESPONSE_TYPE, STATUS_CODE_SUCCESS } from "../config";
import { PostControllerExceptionManager } from "./exception/controller-interfacet";

export default function makeAddPostController(
    PostControllerExceptionManager: PostControllerExceptionManager,
    { addPost }
) {
    return async function addPostController(request) {
        try {
            const add_post = await addPost(
                uuid.v4(),
                request.body.userId,
                request.body.description,
                request.body.tags,
                request.body.imagesLinks,
                request.body.videoLink,
                request.body.price,
                request.body.ingredients,
                request.body.nutritions,
                request.body.steps,
            );
            const headers = HEADERS;
            const statusCode = STATUS_CODE_SUCCESS;
            const type = RESPONSE_TYPE;
            return {
                headers: headers,
                statusCode: statusCode,
                type: type,
                body: {
                    response: add_post,
                },
            };
        } catch (exception) {
            PostControllerExceptionManager.addPostControllerHandler(exception);
            const headers = HEADERS;
            const statusCode = STATUS_CODE_SUCCESS;
            const type = RESPONSE_TYPE;
            return {
                headers: headers,
                statusCode: statusCode,
                type: type,
                body: {
                    exception: exception,
                },
            };
        }
    };
}
