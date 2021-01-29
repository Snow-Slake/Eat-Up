import { HEADERS, RESPONSE_TYPE, STATUS_CODE_FAIL, STATUS_CODE_SUCCESS } from "../../config";
import { IMAGE_DIST, BASE64, Q_MARK, SLASH, INVALID_NAME, IMAGE_TYPE, VIDEO_DIST, VIDEO_TYPE, VOICE_DIST, VOICE_TYPE } from "../../config/fridge-constants";
import { FileControllerException } from "./exception/exception-interface";
import fs from 'fs';

function _fetch_destination(name: string, fileType: string, id: string): string {
    let path = "";

    switch (fileType) {
        case IMAGE_TYPE:
            path = IMAGE_DIST + id + SLASH + name;
            break;
        case VIDEO_TYPE:
            path = VIDEO_DIST + id + SLASH + name;
            break;
        case VOICE_TYPE:
            path = VOICE_DIST + id + SLASH + name;
            break;
    }

    return path;
}

export default function makeUploadPublicFileController(
    FileControllerException: FileControllerException,
    { uploadPublicFile }
) {
    return async function uploadPublicFileController(request) {
        try {
            const id = request.body.id;
            const name = request.body.name;
            const fileType = request.body.type;
            const fileBase64 = request.body.fileData;
            const path = __dirname + name;
            const destination = _fetch_destination(name, fileType, id);

            fs.writeFile(path, fileBase64, BASE64, function(exception) {
                const headers = HEADERS;
                const statusCode = STATUS_CODE_FAIL;
                const type = RESPONSE_TYPE;
                return {
                    headers: headers,
                    statusCode: statusCode,
                    type: type,
                    body: {
                        exception: exception,
                    }
                };
            });

            if (!name.includes(Q_MARK)) {
                const url = uploadPublicFile(
                    path,
                    destination,
                );
                const headers = HEADERS;
                const statusCode = STATUS_CODE_SUCCESS;
                const type = RESPONSE_TYPE;
                return {
                    headers: headers,
                    statusCode: statusCode,
                    type: type,
                    body: {
                        url: url,
                    }
                };
            }
            else {
                const headers = HEADERS;
                const statusCode = STATUS_CODE_FAIL;
                const type = RESPONSE_TYPE;
                return {
                    headers: headers,
                    statusCode: statusCode,
                    type: type,
                    body: {
                        exception: INVALID_NAME,
                    }
                };
            }
        } catch (exception) {
            FileControllerException.updatePublicException(exception);
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
