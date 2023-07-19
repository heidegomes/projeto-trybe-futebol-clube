import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) { }

  public async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (inProgress === 'true') {
      const dataTrue = await this.matchesService.getInProgress();
      res.status(200).json(dataTrue);
    } else if (inProgress === 'false') {
      const dataFalse = await this.matchesService.getNotInProgress();
      res.status(200).json(dataFalse);
    } else if (!inProgress) {
      const serviceResponse = await this.matchesService.getAllMatches();
      res.status(200).json(serviceResponse);
    }
  }

  public async matchFinished(req: Request, res: Response) {
    const { id } = req.params;
    await this.matchesService.matchFinished(Number(id));
    res.status(200).json({ message: 'Finished' });
  }

  public async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this.matchesService.updateMatch(Number(id), homeTeamGoals, awayTeamGoals);
    res.status(200).json({
      homeTeamGoals,
      awayTeamGoals,
    });
  }
}
