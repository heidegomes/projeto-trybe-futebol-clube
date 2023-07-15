import * as jwt from 'jsonwebtoken';

export default class JwtUtils {
  private jwtSecret = process.env.JWT_SECRET || 'xablau';

  sign(payload:any): string {
    return jwt.sign(payload, this.jwtSecret);
  }
}
