import { Request, Router, Response } from 'express';
import LoginController from '../controllers/LoginController';
import LoginValidate from '../middlewares/LoginValidate';

const loginController = new LoginController();

const loginRouter = Router();

loginRouter.post(
  '/',
  LoginValidate.validateLogin,
  (req: Request, res: Response) => loginController.login(req, res),
);

export default loginRouter;
