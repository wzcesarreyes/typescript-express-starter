import * as jwt from 'express-jwt';
import * as jwks from 'jwks-rsa';
import * as config from "config";

export class Jwt {
  static jwtCheck(): jwt.RequestHandler {
      const auth0Config = config.get('auth0');
      return jwt({
        secret: jwks.expressJwtSecret(auth0Config.secret),
        audience: auth0Config.audience,
        issuer: auth0Config.issuer,
        algorithms: auth0Config.algorithms
      });;
  }
}