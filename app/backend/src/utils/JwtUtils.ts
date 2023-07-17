import * as jwt from 'jsonwebtoken';
import IToken from '../Interfaces/IToken';

const jwtOptions: jwt.SignOptions = {
  expiresIn: '7d',
};

export default class JwtUtils {
  private jwtSecret = process.env.JWT_SECRET || 'undefined';

  sign(payload: jwt.JwtPayload): string {
    return jwt.sign(payload, this.jwtSecret, jwtOptions);
  }

  decodeToken = (token: string): jwt.JwtPayload => {
    const decoded = jwt.verify(token, this.jwtSecret);
    return decoded as IToken;
  };
}
