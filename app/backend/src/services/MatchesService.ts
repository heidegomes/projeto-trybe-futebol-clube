// import IMatches from '../Interfaces/IMatches';
import IMatches from '../Interfaces/IMatches';
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

  public async getMatchById(id: number): Promise<MatchesModel | null> {
    const match = await this.matchesModel.findByPk(id);
    // if (!match) return { status: 'NOT_FOUND', data: { message: `Match ${id} not found` } };
    return match;
  }

  public async matchFinished(id: number): Promise<void> {
    await this.matchesModel.update({ inProgress: false }, { where: { id } });
  }

  public async updateMatch(id: number, homeTeamGoals:number, awayTeamGoals:number): Promise<void> {
    await this.matchesModel.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
  }

  public async createMatch(
    homeTeamId:number,
    awayTeamId:number,
    homeTeamGoals:number,
    awayTeamGoals:number,
  ): Promise<IMatches> {
    const createMatch = await this.matchesModel.create(
      { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals, inProgress: true },
    );
    console.log('####', createMatch);
    return createMatch;
  }
}
