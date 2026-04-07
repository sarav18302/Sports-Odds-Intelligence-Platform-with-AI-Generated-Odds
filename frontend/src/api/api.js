const BASE_URL = process.env.REACT_APP_API_URL;

export async function fetchMatches() {
  const res = await fetch(`${BASE_URL}/matches`);
  return res.json();
}

export async function queryAgent(query) {
  const res = await fetch(`${BASE_URL}/agent/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query })
  });

  return res.json();
}