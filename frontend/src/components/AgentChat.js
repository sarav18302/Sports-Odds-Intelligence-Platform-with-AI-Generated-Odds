import { useState } from "react";
import { queryAgent } from "../api/api";

export default function AgentChat() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleAsk = async () => {
    const res = await queryAgent(input);
    setResponse(res.answer);
  };

  return (
    <div style={styles.chat}>
      <h3>AI Agent</h3>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask something..."
      />

      <button onClick={handleAsk}>Ask</button>

      <p><b>Answer:</b> {response}</p>
    </div>
  );
}

const styles = {
  chat: {
    border: "1px solid #aaa",
    padding: "15px",
    marginTop: "20px"
  }
};