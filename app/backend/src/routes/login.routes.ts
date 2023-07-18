import { Request, Router, Response } from 'express';
import LoginController from '../controllers/LoginController';
import LoginValidate from '../middlewares/LoginValidate';
import TokenValidate from '../middlewares/Tokenvalidate';
import AuthController from '../controllers/AuthController';

const loginController = new LoginController();
const authController = new AuthController();

const loginRouter = Router();

loginRouter.post(
  '/',
  LoginValidate.validateLogin,
  (req: Request, res: Response) => loginController.login(req, res),
);
loginRouter.get(
  '/role',
  TokenValidate.validateToken,
  (req: Request, res: Response) => authController.loginToken(req, res),
);

export default loginRouter;
