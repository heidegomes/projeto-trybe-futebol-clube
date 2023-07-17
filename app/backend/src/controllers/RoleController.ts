import { Request, Response } from 'express';
import UsersService from '../services/UsersService';

export default class RoleController {
  constructor(
    private usersService = new UsersService(),
  ) { }

  public async loginToken(req: Request, res: Response) {
    // const { user } = res.locals;
    const { id } = res.locals.user;
    const { status, data } = await this.usersService.getUserById(id);

    if (status === 'NOT_FOUND') {
      return res.status(401).json({
        message: 'Token must be a valid token',
      });
    }
    if ('role' in data) {
      return res.status(200).json({ role: data.role });
    }
  }
}
