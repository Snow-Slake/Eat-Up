import { HEADERS, RESPONSE_TYPE, STATUS_CODE_SUCCESS } from "../config";
import { PostControllerExceptionManager } from "./exception/controller-interfacet";

export default function makeDeletePostController(
    PostControllerExceptionManager: PostControllerExceptionManager,
    { deletePost }
) {
    return async function deletePostController(request) {
        try {
            const delete_post = await deletePost(
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
                    response: delete_post,
                },
            };
        } catch (exception) {
            PostControllerExceptionManager.deletePostControllerHandler(exception);
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
