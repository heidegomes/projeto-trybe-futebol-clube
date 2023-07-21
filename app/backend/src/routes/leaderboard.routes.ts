import { Request, Router, Response } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardController = new LeaderboardController();

const leaderboardRouter = Router();

leaderboardRouter.get(
  '/home',
  (req: Request, res: Response) => leaderboardController.getTeamsHome(req, res),
);
leaderboardRouter.get(
  '/away',
  (req: Request, res: Response) => leaderboardController.getTeamsAway(req, res),
);

export default leaderboardRouter;
