import { Request, Router, Response } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardController = new LeaderboardController();

const leaderboardRouter = Router();

leaderboardRouter.get(
  '/home',
  (req: Request, res: Response) => leaderboardController.getAllTeams(req, res),
);

export default leaderboardRouter;
