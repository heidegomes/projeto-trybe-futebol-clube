import TeamsModel from '../database/models/TeamsModel';
import MatchesModel from '../database/models/MatchesModel';

export default class MatchesService {
  constructor(
    private matchesModel = MatchesModel,
  ) { }

  public async getAllMatches(): Promise<MatchesModel[]> {
    const allMatches = await this.matchesModel.findAll({
      include: [
        {
          model: TeamsModel,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          model: TeamsModel,
          as: 'awayTeam',
          attributes: ['teamName'],
        },
      ],
    });
    return allMatches;
  }

  public async getInProgress(): Promise<MatchesModel[]> {
    const inProgress = await this.matchesModel.findAll({
      where: { inProgress: true },
      include: [
        {
          model: TeamsModel,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          model: TeamsModel,
          as: 'awayTeam',
          attributes: ['teamName'],
        },
      ],
    });
    return inProgress;
  }

  public async getNotInProgress(): Promise<MatchesModel[]> {
    const inProgress = await this.matchesModel.findAll({
      where: { inProgress: false },
      include: [
        {
          model: TeamsModel,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          model: TeamsModel,
          as: 'awayTeam',
          attributes: ['teamName'],
        },
      ],
    });
    return inProgress;
  }
}
