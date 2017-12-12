import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./route";
import { Auth } from "../utils/auth";

import * as bodyParser from "body-parser";

import * as config from "config";

/**
 * / route
 *
 * @class User
 */
export class LoginRoute extends BaseRoute {

  /**
   * Create the routes.
   *
   * @class LoginRoute
   * @method create
   * @static
   */
  public static create(router: Router) {
    //log
    console.log("[LoginRoute::create] Creating login route.");

    router.use(bodyParser.json());

    //add home page route
    router.post("/auth/login", (req: Request, res: Response, next: NextFunction) => {
      new LoginRoute().index(req, res, next);
    });
    
  }

  /**
   * Constructor
   *
   * @class LoginRoute
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * The home page route.
   *
   * @class LoginRoute
   * @method index
   * @param req {Request} The express Request object.
   * @param res {Response} The express Response object.
   * @next {NextFunction} Execute the next method.
   */
  public index(req: Request, res: Response, next: NextFunction) {
 
    const data = req.body;

    const client = Auth.clientCheck(data.client_id, data.client_secret);

    if(!client) { 
      res.status(401).json({ message: 'Missing or invalid token' });
      return false;
    }
    
    const token = Auth.sign(client.id);
    res.send({ auth: true, token: token, expire: Auth.getTokenExpire() }); 
  }
}
