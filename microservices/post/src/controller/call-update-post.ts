import { HEADERS, RESPONSE_TYPE, STATUS_CODE_SUCCESS } from "../config";
import { PostControllerExceptionManager } from "./exception/controller-interfacet";

export default function makeUpdatePostController(
    PostControllerExceptionManager: PostControllerExceptionManager,
    { updatePost }
) {
    return async function updatePostController(request) {
        try {
            const update_post = await updatePost(
                request.body.id,
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
                    response: update_post,
                },
            };
        } catch (exception) {
            PostControllerExceptionManager.updatePostControllerHandler(exception);
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
