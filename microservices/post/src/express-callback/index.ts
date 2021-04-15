import {
    ACCESS_DENIED,
    FETCH_METHOD,
    HEADERS,
    STATUS_CODE_FORBBIDEN,
    TOKEN_ENDPOINT,
} from "../config";

export default function makeExpressCallback(controller) {
    return async (req, res) => {
        const token: string = req.body.access_token;
        await fetch(TOKEN_ENDPOINT, {
            method: FETCH_METHOD,
            body: JSON.stringify({
                access_token: token,
            }),
            headers: HEADERS,
        }).then(async (response) => {
            if (response.status != 200) {
                res.status(STATUS_CODE_FORBBIDEN).send({
                    exception: ACCESS_DENIED,
                });
                return;
            }
            await response.json().then(async (data) => {
                if (data.response == false) {
                    res.status(STATUS_CODE_FORBBIDEN).send({
                        exception: ACCESS_DENIED,
                    });
                    return;
                }
            });
        });

        const httpRequest = {
            body: req.body,
            ip: req.ip,
            headers: HEADERS,
        };

        controller(httpRequest)
            .then((httpResponse) => {
                res.set(httpResponse.headers);
                res.type(httpResponse.type);
                res.status(httpResponse.statusCode).send(httpResponse.body);
            })
            .catch((httpResponse) => {
                res.set(httpResponse.headers);
                res.type(httpResponse.type);
                res.status(httpResponse.statusCode).send(httpResponse.body);
            });
    };
}
