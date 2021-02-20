import { PostControllerExceptionManager } from "./controller-interfacet";

export default class PostControllerException implements PostControllerExceptionManager {
    addPostControllerHandler(exception: string) {
        console.log('add post controller throw exception: ' + exception);
    }
    updatePostControllerHandler(exception: string) {
        console.log('update post controller throw exception: ' + exception);
    }
    deletePostControllerHandler(exception: string) {
        console.log('delete post controller throw exception: ' + exception);
    }
}