const QUERY = `select *, round(total_pontos / (jogos * 3) * 100, 2) as eficiencia
from(
  SELECT team_name, ((sum(vitoria) * 3) + (sum(empates) * 1)) as total_pontos,
  count(id) as jogos,
  sum(vitoria) as vitoria, sum(empates) as empates, sum(derrotas) as derrotas,
  sum(gols_marcados) as gols_marcados, sum(gols_sofridos) as gols_sofridos,
  sum(gols_marcados) - sum(gols_sofridos) as saldo_gols
  from(
    (
      select t.id, t.team_name, m.home_team_goals as gols_marcados,
          m.away_team_goals as gols_sofridos,
				 	if (m.home_team_goals > m.away_team_goals, 1, 0) as vitoria,
				 	if (m.home_team_goals = m.away_team_goals, 1, 0) as empates,
					if (m.home_team_goals < m.away_team_goals, 1, 0) as derrotas
				 from teams t
				 inner join matches m on m.home_team_id = t.id 
				 where m.in_progress = 0
				 order by t.id
				)
UNION
  (
    select t.id, t.team_name, m.away_team_goals as gols_marcados,
          m.home_team_goals as gols_sofridos,
				 	if (m.home_team_goals < m.away_team_goals, 1, 0) as vitoria,
					if (m.home_team_goals = m.away_team_goals, 1, 0) as empates,
					if (m.home_team_goals > m.away_team_goals, 1, 0) as derrotas
				 from teams t
				 inner join matches m on m.away_team_id = t.id 
				 where m.in_progress = 0
				 order by t.id
				)
		) as tj
		group by id, team_name
		order by total_pontos desc, vitoria desc, saldo_gols desc, gols_marcados desc
) as t1`;

export default QUERY;
