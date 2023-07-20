import { ServiceResponse } from '../Interfaces/ServiceResponse';
import TeamsModel from '../database/models/TeamsModel';
import { Team } from '../types/Teams';

export default class TeamsService {
  constructor(
    private teamsModel = TeamsModel,
  ) { }

  public async getAllTeams(): Promise<ServiceResponse<Team[]>> {
    const allTeams = await this.teamsModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }

  public async getTeamById(id: number): Promise<ServiceResponse<Team>> {
    const team = await this.teamsModel.findByPk(id);
    if (!team) return { status: 'NOT_FOUND', data: { message: `Team ${id} not found` } };
    return { status: 'SUCCESSFUL', data: team };
  }
}
// coment
