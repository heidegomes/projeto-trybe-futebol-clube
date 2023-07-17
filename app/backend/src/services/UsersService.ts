import { User } from '../types/User';
import UsersModel from '../database/models/UsersModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class UsersService {
  constructor(
    private usersModel = UsersModel,
  ) { }

  // public async getAllUsers(): Promise<ServiceResponse<User>> {
  //   const allUsers = await this.usersModel.findAll();
  //   return { status: 'SUCCESSFUL', data: allUsers };
  // }

  public async getUserById(id: number): Promise<ServiceResponse<User>> {
    const user = await this.usersModel.findByPk(id);
    if (!user) return { status: 'NOT_FOUND', data: { message: `User${id} not found` } };
    return { status: 'SUCCESSFUL', data: user };
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.usersModel.findOne({ where: { email } });
    return user;
  }
}
