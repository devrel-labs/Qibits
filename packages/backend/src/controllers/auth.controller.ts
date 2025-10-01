import type { IncomingMessage, ServerResponse } from "http";

export class AuthController {

    /**
     * @method handlerQibitsUserRegister - register the user on Qibits
     * @param {IncomingMessage} req
     * @param {ServerResponse} res
     * @param {string} bodyChunk
     */
    public async handlerQibitsUserRegister(req: IncomingMessage, res: ServerResponse, bodyChunk: string) {
        const response = {
            message: "/register route"
        }

        res.writeHead(200, {"content-type": "application/json"});
        res.end(JSON.stringify(response));
    }

    /**
     * @method handlerQibitsUserLogin - handler user login
     * @param {IncomingMessage} req
     * @param {ServerResponse} res
     * @param {string} bodyChunk
     */
    public async handlerQibitsUserLogin(req: IncomingMessage, res: ServerResponse, bodyChunk?: string) {
        const response = {
            message: "/login route"
        };

        res.writeHead(200, {"content-type": "application/json"});
        res.end(JSON.stringify(response));
    }
}