import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./route";


/**
 * / route
 *
 * @class User
 */
export class ApiRoute extends BaseRoute {

  /**
   * Create the routes.
   *
   * @class ApiRoute
   * @method create
   * @static
   */
  public static create(router: Router) {
    //log
    console.log("[ApiRoute::create] Creating api route.");

    //add home page route
    router.get("/", (req: Request, res: Response, next: NextFunction) => {
      new ApiRoute().index(req, res, next);
    });

    router.get('/authorized', function (req, res) {
      res.send('Secured Resource');
    });
  }

  /**
   * Constructor
   *
   * @class ApiRoute
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * The home page route.
   *
   * @class ApiRoute
   * @method index
   * @param req {Request} The express Request object.
   * @param res {Response} The express Response object.
   * @next {NextFunction} Execute the next method.
   */
  public index(req: Request, res: Response, next: NextFunction) {
    res.send('Done!!!');
  }
}