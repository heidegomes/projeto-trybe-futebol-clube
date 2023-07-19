import { Request, Router, Response } from 'express';
import MatchesController from '../controllers/MatchesController';

const matchesController = new MatchesController();

const matchesRouter = Router();

matchesRouter.get('/', (req: Request, res: Response) => matchesController.getAllMatches(req, res));

export default matchesRouter;
