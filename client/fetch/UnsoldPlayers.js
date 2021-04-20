import { useState, useEffect } from "react";
import { API_URL, JWT_TOKEN, USER_ID } from '../config/config';
import { getLocalStorage } from '../utils/storageUtil';

export default function getUnsoldPlayers(url, id) {
  const [data, setData] = useState({
    players: null
  });

  useEffect(() => {
    const bearer_token = getLocalStorage(JWT_TOKEN);
    const bearer = 'Bearer ' + bearer_token;
    fetch(url, {
      method: 'GET',
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Authorization': bearer,
        'X-LeagueId': id
    } })
      .then(async response => {
        const data = await response.json()
        setData({
          players: data.payload.unSoldPlayers,
          error: !response.ok
        })
      })
      .catch(error => {
        //fetch throws an error only on network failure or if anything prevented the request from completing
        setData({
          response: { status: "network_failure" },
          error: true
        })
      })
  }, [url, id]);

  return data;
}