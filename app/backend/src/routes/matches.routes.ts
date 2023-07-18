import { Request, Router, Response } from 'express';
import MatchesController from '../controllers/MatchesController';

const matchesController = new MatchesController();

const matchesRouter = Router();

matchesRouter.get('/', (req: Request, res: Response) => matchesController.getAllMatches(req, res));
// teamsRouter.get('/', (req: Request, res: Response) => matchesController.getFinished(req, res));
// teamsRouter.get('/', (req: Request, res: Response) => matchesController.getInProgress(req, res));

export default matchesRouter;
