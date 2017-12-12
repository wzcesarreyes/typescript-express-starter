import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";
import * as errorHandler from "errorhandler";
import * as config from "config";
import { ApiRoute } from "./routes/api";
import { LoginRoute } from "./routes/login";
import { Jwt } from './utils/jwt';
import { Auth } from "./utils/auth";

/**
 * The server.
 *
 * @class Server
 */
export class Server {

  public app: express.Application;

  /**
   * Bootstrap the application.
   *
   * @class Server
   * @method bootstrap
   * @static
   * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
   */
  public static bootstrap(): Server {
    return new Server();
  }

  /**
   * Constructor.
   *
   * @class Server
   * @constructor
   */
  constructor() {
    //create expressjs application
    this.app = express();

    //configure application
    this.config();

    //add routes
    this.routes();

    //add public api
    this.Api();

  }

  /**
   * Create authenticated REST API routes
   *
   * @class Server
   * @method api
   */
  public authenticatedApi() {

    let jwtCheck = Jwt.jwtCheck();

    // this.app.use(jwtCheck);

    // // If we do not get the correct credentials, we’ll return an appropriate message
    // this.app.use(function (err, req, res, next) {
    //   if (err.name === 'UnauthorizedError') {
    //     res.status(401).json({ message: 'Missing or invalid token' });
    //   }
    // });

    let router: express.Router;
    router = express.Router();



    //use router middleware
    this.app.use(router);
  }

  /**
   * Create a non authenticated REST API routes
   *
   * @class Server
   * @method api
   */
  public Api() {
    let router: express.Router;
    router = express.Router();

    //LoginRoute
    LoginRoute.create(router);

    //IndexRoute
    ApiRoute.create(router);

    this.app.use(Auth.check);
    // If we do not get the correct credentials, we’ll return an appropriate message
    this.app.use(function (err, req, res, next) {
      if (err.name === 'JsonWebTokenError') {
        res.status(500).json({ auth: false, message: err.message });
      }
    });

    //use router middleware
    this.app.use(router);

  }

  /**
   * Configure application
   *
   * @class Server
   * @method config
   */
  public config() {

    //add static paths
    this.app.use(express.static(path.join(__dirname, "public")));

    //configure pug
    this.app.set("views", path.join(__dirname, "views"));
    this.app.set("view engine", "pug");

    //mount logger
    this.app.use(logger("dev"));

    //mount json form parser
    this.app.use(bodyParser.json());

    //mount query string parser
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));

    //mount cookie parser middleware
    const cookieKey = config.get('cookieSecret');
    this.app.use(cookieParser(cookieKey));

    // catch 404 and forward to error handler
    this.app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
      err.status = 404;
      next(err);
    });

    //error handling
    this.app.use(errorHandler());

  }

  /**
   * Create and return Router.
   *
   * @class Server
   * @method config
   * @return void
   */
  private routes() {

  }

}
