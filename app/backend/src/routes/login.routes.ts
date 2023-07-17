import { Request, Router, Response } from 'express';
import LoginController from '../controllers/LoginController';
import LoginValidate from '../middlewares/LoginValidate';
import TokenValidate from '../middlewares/Tokenvalidate';
import RoleController from '../controllers/RoleController';

const loginController = new LoginController();
const roleController = new RoleController();

const loginRouter = Router();

loginRouter.post(
  '/',
  LoginValidate.validateLogin,
  (req: Request, res: Response) => loginController.login(req, res),
);
loginRouter.get(
  '/role',
  TokenValidate.validateToken,
  (req: Request, res: Response) => roleController.loginToken(req, res),
);

export default loginRouter;
