import { useState, useEffect } from "react";

export default function getLeagueData(url, userId) {
  const [data, setData] = useState([]);

  async function getData() {
    const response = await fetch(url, { headers: {
        'X-UserId': userId
      }});
    const data = await response.json();
    setData(data.payload.leagueInfos);
  }

  useEffect(() => {
    getData();
  }, []);

  return data;
}