import { AuthControllerService } from "../Services/AuthControllerService.js";

const routes = [
    {
        method: "GET",
        path: "/auth/register",
        handler: (req: any, res: any, bodyChunk: string) => 
            AuthControllerService.handlerQibitsUserRegister(req, res, bodyChunk)
    },
    {
        method: "GET",
        path: "/auth/login",
        handler: (req: any, res: any, bodyChunk: string) => 
            AuthControllerService.handlerQibitsUserLogin(req, res, bodyChunk)
    }
];

export default routes;