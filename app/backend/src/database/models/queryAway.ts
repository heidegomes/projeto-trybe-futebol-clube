const QUERY = `select *, round(totalPoints/(totalGames * 3)*100, 2) as efficiency
from (
    SELECT team_name as name, ((sum(totalVictories) * 3) + (sum(totalDraws) * 1))
    as totalPoints, 
        count(id) as totalGames, 
        sum(totalVictories) as totalVictories, sum(totalDraws) as totalDraws,
        sum(totalLosses) as totalLosses, 
        sum(goalsFavor) as goalsFavor, sum(goalsOwn) as goalsOwn, 
        sum(goalsFavor) - sum(goalsOwn) as goalsBalance
    from (
        select t.id, t.team_name, m.away_team_goals as goalsFavor,
        m.home_team_goals as goalsOwn,
          if (m.home_team_goals < m.away_team_goals, 1, 0) as totalVictories,
          if (m.home_team_goals = m.away_team_goals, 1, 0) as totalDraws,
          if (m.home_team_goals > m.away_team_goals, 1, 0) as totalLosses
        from teams t
        inner join matches m on m.away_team_id = t.id 
        where m.in_progress = 0
        order by t.id
    ) as tv
    group by id, team_name
    order by totalPoints desc, totalVictories desc, goalsBalance desc, goalsFavor desc
) as t1
`;

export default QUERY;
