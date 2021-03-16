import { useState, useEffect } from "react";

export default function getLeagueDetails(url) {
  const [data, setData] = useState({});

  async function getData() {
    const response = await fetch(url);
    const data = await response.json();
    setData(data.payload.leagueInfo);
  }

  useEffect(() => {
    getData();
  }, []);

  return data;
}