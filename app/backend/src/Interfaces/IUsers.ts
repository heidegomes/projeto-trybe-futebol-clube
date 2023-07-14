interface IUser{
  id: number,
  username: string,
  role: string,
  email: string,
  password: string,
}

export interface ILogin {
  email: string;
  password: string;
}

export type IUserResponse = Omit<IUser, 'password'>;
export default IUser;
