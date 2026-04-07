import MatchesPage from "./pages/MatchesPage";
import AgentChat from "./components/AgentChat";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Sports Odds Intelligence</h1>

      <MatchesPage />
      <AgentChat />
    </div>
  );
}

export default App;
