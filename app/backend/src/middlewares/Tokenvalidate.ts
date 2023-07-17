import { NextFunction, Request, Response } from 'express';
import JwtUtils from '../utils/JwtUtils';

class TokenValidate {
  static validateToken(req: Request, res: Response, next: NextFunction): Response | void {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({
        message: 'Token not found',
      });
    }

    const data = authorization.split(' ');
    const token = data[1];
    const jwtUtils = new JwtUtils();

    try {
      res.locals.user = jwtUtils.decodeToken(token) as { id: number };
      next();
    } catch (exception) {
      // const error = exception as { message: string };
      return res.status(401).json({
        message: 'Token must be a valid token',
      });
    }
  }
}

export default TokenValidate;
