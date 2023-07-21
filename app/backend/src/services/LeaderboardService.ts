import TeamsModel from '../database/models/TeamsModel';
import MatchesModel from '../database/models/MatchesModel';

export default class LeaderboardService {
  constructor(
    private matchesModel = MatchesModel,
    private teamsModel = TeamsModel,
  ) { }

  public async getAllMatches(): Promise<MatchesModel[]> {
    const allMatches = await this.matchesModel.findAll({
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
    const nameTeam = allMatches.map((p) => p.homeTeamId);
    console.log('nameTeam', nameTeam);
    return allMatches;
  }
}

// {
//   "name": "Palmeiras",
//   "totalPoints": 13,
//   "totalGames": 5,
//   "totalVictories": 4,
//   "totalDraws": 1,
//   "totalLosses": 0,
//   "goalsFavor": 17,
//   "goalsOwn": 5,
//   "goalsBalance": 12,
//   "efficiency": 86.67
// },
