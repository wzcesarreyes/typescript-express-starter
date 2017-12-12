import * as jwt from 'jsonwebtoken';
import * as config from "config";

export class Auth {
  static sign(clientId: string): string {
    const authSecret = config.get('authSecret');
    const token = jwt.sign({ id: clientId }, authSecret, {
      expiresIn: config.get('tokenExpire');
    });

    return token;
  }

  static clientCheck(id: string, secret: string): any {
    const clients = config.get('clients');
    const client = clients.find(c => {
      return (c.id === id && c.secret === secret)
    });
    return client != undefined ? client : false;
  }

  static getTokenExpire(): number {
    return config.get('tokenExpire');
  }

  static check(req, res, next): void {
    const endpoints = config.get('openEndpoints');
    const headerTokenName = config.get('headerTokenName');
    const authSecret = config.get('authSecret');

    // Run the validation
    if (endpoints.indexOf(req.originalUrl) < 0) {
      const token = req.headers[headerTokenName];
      jwt.verify(token, authSecret, (err, decoded) => {
        if (err) throw err;
      });
    }

    next();
  }
}