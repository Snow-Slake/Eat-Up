import { HEADERS, RESPONSE_TYPE, STATUS_CODE_SUCCESS } from "../../config";
import {
    IMAGE_DIST,
    IMAGE_TYPE,
    ALL_SLASH,
    SLASH,
    Q_MARK,
    VIDEO_DIST,
    VIDEO_TYPE,
    VOICE_DIST,
    VOICE_TYPE,
} from "../../config/fridge-constants";
import { FileControllerException } from "./exception/exception-interface";

function _fetch_destination(url: string, fileType: string, id: string): string {
    let path = "";
    let count = 0;

    for (let i = 0; i < url.length && url[i] != Q_MARK; i++) {
        if (url[i] == SLASH) {
            count++;
        }
        else if (count == ALL_SLASH) {
            path = path + url[i];
        }
    }

    switch (fileType) {
        case IMAGE_TYPE:
            path = IMAGE_DIST + id + SLASH + path;
            break;
        case VIDEO_TYPE:
            path = VIDEO_DIST + id + SLASH + path;
            break;
        case VOICE_TYPE:
            path = VOICE_DIST + id + SLASH + path;
            break;
    }

    return path;
}

export default function makeDeleteFileController(
    FileControllerException: FileControllerException,
    { deleteFile }
) {
    return async function deleteFileController(request) {
        try {
            const id = request.body.id;
            const url = request.body.url;
            const fileType = request.body.type;
            const destination = _fetch_destination(url, fileType, id);

            const isDeleted = deleteFile(destination);
            const headers = HEADERS;
            const statusCode = STATUS_CODE_SUCCESS;
            const type = RESPONSE_TYPE;
            return {
                headers: headers,
                statusCode: statusCode,
                type: type,
                body: {
                    response: isDeleted,
                },
            };
        } catch (exception) {
            FileControllerException.deleteException(exception);
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
