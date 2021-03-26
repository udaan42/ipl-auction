import { useState, useEffect } from "react";

export default function getPlayerBagDetails(url, bagNumber) {
  const [players, setPlayers] = useState({
    players: [],
    reload: false,
    bagNumber: 0
  });

  useEffect(() => {
    const endpoint = `${url}/${bagNumber}`;
    fetch(endpoint)
      .then(async response => {
        const data = await response.json()
        setPlayers({
          players: data.payload.playerInfos,
          error: !response.ok,
          bagNumber: bagNumber,
        })
      })
      .catch(error => {
        //fetch throws an error only on network failure or if anything prevented the request from completing
        setPlayers({
          response: { status: "network_failure" },
          error: true,
          reload: false,
        })
      })
  }, [url, bagNumber]);

  return players;
}