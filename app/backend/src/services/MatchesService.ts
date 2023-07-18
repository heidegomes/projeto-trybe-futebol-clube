import TeamsModel from '../database/models/TeamsModel';
import { Match } from '../types/Matches';
import MatchesModel from '../database/models/MatchesModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class MatchesService {
  constructor(
    private matchesModel = MatchesModel,
  ) { }

  public async getAllMatches(): Promise<ServiceResponse<Match[]>> {
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
    return { status: 'SUCCESSFUL', data: allMatches as any };
  }

  // public async getTeamById(id: number): Promise<ServiceResponse<Team>> {
  //   const team = await this.teamsModel.findByPk(id);
  //   if (!team) return { status: 'NOT_FOUND', data: { message: `Team ${id} not found` } };
  //   return { status: 'SUCCESSFUL', data: team };
  // }
}
