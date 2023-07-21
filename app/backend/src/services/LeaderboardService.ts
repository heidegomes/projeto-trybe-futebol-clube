import sequelize from '../database/models/index';
import MatchesModel from '../database/models/MatchesModel';
import query from '../database/models/query';

export default class LeaderboardService {
  public static async getAllMatches(): Promise<MatchesModel[]> {
    const leaderBoard = await sequelize.query(query, {
      model: MatchesModel,
      mapToModel: true,
    });
    return leaderBoard;
  }
}
