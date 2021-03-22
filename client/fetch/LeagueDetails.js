import { useState, useEffect } from "react";

export default function getLeagueDetails(url, refresh, options = { body: {}, query: {} }) {
  const [data, setData] = useState({
    data: null,
    reload: false
  });

  useEffect(() => {
    fetch(url)
      .then(async response => {
        const data = await response.json()
        setData({
          data: data.payload.leagueInfo,
          error: !response.ok,
          reload: false,
        })
      })
      .catch(error => {
        //fetch throws an error only on network failure or if anything prevented the request from completing
        setData({
          response: { status: "network_failure" },
          error: true,
          reload: false,
        })
      })
  }, [url, refresh]);

  return data;
}