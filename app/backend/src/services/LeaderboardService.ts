import sequelize from '../database/models/index';
import MatchesModel from '../database/models/MatchesModel';
import queryHome from '../database/models/queryHome';
import queryAway from '../database/models/queryAway';
import query from '../database/models/query';

export default class LeaderboardService {
  public static async getTeamsHome(): Promise<MatchesModel[]> {
    const leaderBoard = await sequelize.query(queryHome, {
      model: MatchesModel,
      mapToModel: true,
    });
    return leaderBoard;
  }

  public static async getTeamsAway(): Promise<MatchesModel[]> {
    const leaderBoard = await sequelize.query(queryAway, {
      model: MatchesModel,
      mapToModel: true,
    });
    return leaderBoard;
  }

  public static async getTeams(): Promise<MatchesModel[]> {
    const leaderBoard = await sequelize.query(query, {
      model: MatchesModel,
      mapToModel: true,
    });
    return leaderBoard;
  }
}
