import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(
    private leaderboardService = LeaderboardService,
  ) { }

  public async getTeamsHome(_req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.getTeamsHome();
    res.status(200).json(serviceResponse);
  }

  public async getTeamsAway(_req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.getTeamsAway();
    res.status(200).json(serviceResponse);
  }
}
