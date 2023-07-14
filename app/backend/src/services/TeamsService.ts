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
}
