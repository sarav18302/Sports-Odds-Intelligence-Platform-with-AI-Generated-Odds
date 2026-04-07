import { useEffect, useState } from "react";
import { fetchMatches } from "../api/api";
import MatchCard from "../components/MatchCard";

export default function MatchesPage() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetchMatches().then((data) => {
      console.log("API Response:", data);

      if (Array.isArray(data)) {
        setMatches(data);
      } else {
        console.error("Invalid data format:", data);
        setMatches([]);
      }
    });
  }, []);

  return (
    <div>
      <h2>Matches</h2>

      {matches.length === 0 ? (
        <p>No matches available</p>
      ) : (
        matches.map((m) => (
          <MatchCard key={m.id} match={m} />
        ))
      )}
    </div>
  );
}