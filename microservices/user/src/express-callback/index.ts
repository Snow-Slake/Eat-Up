import { API_ROOT } from "../config";

export function makeExpressCallback(controller) {
    return (req, res) => {
        const httpRequest = {
            body: req.body,
            ip: req.ip,
            headers: API_ROOT.api_headers,
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
