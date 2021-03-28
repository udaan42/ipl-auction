import { useState, useEffect } from "react";
import { API_URL, JWT_TOKEN, USER_ID } from '../config/config';
import { getLocalStorage } from '../utils/storageUtil';

export default function getPlayerBagDetails(url, bagNumber) {
  const [players, setPlayers] = useState({
    players: [],
    reload: false,
    bagNumber: 0
  });

  useEffect(() => {
    const endpoint = `${url}/${bagNumber}`;
    const bearer_token = getLocalStorage(JWT_TOKEN);
    const bearer = 'Bearer ' + bearer_token;
    fetch(endpoint, {
      method: 'GET',
      withCredentials: true,
      credentials: 'include',
      headers: {
          'Authorization': bearer
      } })
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