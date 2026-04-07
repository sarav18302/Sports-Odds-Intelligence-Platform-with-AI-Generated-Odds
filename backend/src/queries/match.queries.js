module.exports = {
    CREATE_MATCH: `
      INSERT INTO matches
      (sport, league, team_a, team_b, team_a_rating, team_b_rating, start_time)
      VALUES($1,$2,$3,$4,$5,$6,$7)
      RETURNING *
    `,
  
    GET_ALL_MATCHES: `
      SELECT * FROM matches ORDER BY start_time
    `,
  
    GET_MATCH_BY_ID: `
      SELECT * FROM matches WHERE id=$1
    `,
  
    UPDATE_MATCH: `
      UPDATE matches
      SET team_a_rating=$1, team_b_rating=$2
      WHERE id=$3
      RETURNING *
    `,
  
    DELETE_MATCH: `
      DELETE FROM matches WHERE id=$1
    `,
  };