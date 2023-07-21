import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(
    private leaderboardService = LeaderboardService,
  ) { }

  public async getAllTeams(_req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.getAllMatches();
    res.status(200).json(serviceResponse);
  }
}
