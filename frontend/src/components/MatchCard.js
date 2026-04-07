export default function MatchCard({ match }) {
    return (
      <div style={styles.card}>
        <h3>{match.teams}</h3>
  
        <p><b>Odds</b></p>
        <p>Team A: {match.odds.teamA}</p>
        <p>Draw: {match.odds.draw}</p>
        <p>Team B: {match.odds.teamB}</p>
  
        <p><b>Probabilities</b></p>
        <p>A: {(match.probabilities.teamA * 100).toFixed(1)}%</p>
        <p>B: {(match.probabilities.teamB * 100).toFixed(1)}%</p>
        <p>Draw: {(match.probabilities.draw * 100).toFixed(1)}%</p>
      </div>
    );
  }
  
  const styles = {
    card: {
      border: "1px solid #ccc",
      padding: "15px",
      marginBottom: "10px",
      borderRadius: "10px"
    }
  };