import { Request, Router, Response } from 'express';
import MatchesController from '../controllers/MatchesController';
import TokenValidate from '../middlewares/Tokenvalidate';

const matchesController = new MatchesController();

const matchesRouter = Router();

matchesRouter.get('/', (req: Request, res: Response) => matchesController.getAllMatches(req, res));
matchesRouter.patch(
  '/:id/finish',
  TokenValidate.validateToken,
  (req: Request, res: Response) => matchesController.matchFinished(req, res),
);
// matchesRouter.patch(
//   '/:id',
//   TokenValidate.validateToken,
//   (req: Request, res: Response) => matchesController.updateMatch(req, res),
// );

export default matchesRouter;
