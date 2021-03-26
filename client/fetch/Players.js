import { useState, useEffect } from "react";

export default function getPlayersDetails(url) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(url)
      .then(async response => {
        const data = await response.json()
        setData(data.payload.playerInfos)
      })
      .catch(error => {
        //fetch throws an error only on network failure or if anything prevented the request from completing
        setData({
          response: { status: "network_failure" },
          error: true
        })
      })
  }, [url]);

  return data;
}