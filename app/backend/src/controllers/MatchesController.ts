import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';
import TeamsService from '../services/TeamsService';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
    private teamsService = new TeamsService(),
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

  public async createMatch(req: Request, res: Response) {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    if (homeTeamId === awayTeamId) {
      return res.status(422).json({
        message: 'It is not possible to create a match with two equal teams',
      });
    }
    const verifyHomeTeam = await this.teamsService.getTeamById(homeTeamId);
    const verifyAwayTeam = await this.teamsService.getTeamById(awayTeamId);
    if (verifyHomeTeam.status === 'NOT_FOUND' || verifyAwayTeam.status === 'NOT_FOUND') {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    const data = await this.matchesService.createMatch(
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
    );
    res.status(201).json(data);
  }
}
