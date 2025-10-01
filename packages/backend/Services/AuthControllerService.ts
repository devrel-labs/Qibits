import {AuthController} from "../controllers/auth.controller.js";


/**
 * * @constant AuthControllerService - instance of AuthController
 * * @description - instance of AuthController to be used in other parts of the application
 * * * @example - import { AuthControllerService } from "./Services/AuthControllerService.js";
 * * * AuthControllerService.handlerQibitsUserRegister(req, res);
 */
export const AuthControllerService = new AuthController();



