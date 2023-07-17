import * as bcryptjs from 'bcryptjs';
import { Request, Response } from 'express';
import JwtUtils from '../utils/JwtUtils';
import { ILogin } from '../Interfaces/IUsers';
import UsersService from '../services/UsersService';

export default class LoginController {
  private jwtUtils = new JwtUtils();

  constructor(
    private usersService = new UsersService(),
  ) { }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body as ILogin;

    const userLogin = await this.usersService.findByEmail(email);

    if (!userLogin) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    if (!bcryptjs.compareSync(password, userLogin.password)) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    const token = this.jwtUtils.sign({ id: userLogin.id });

    return res.status(200).json({
      token,
    });
  }
}
