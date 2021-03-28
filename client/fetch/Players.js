import { useState, useEffect } from "react";
import { API_URL, JWT_TOKEN, USER_ID } from '../config/config';
import { getLocalStorage } from '../utils/storageUtil';

export default function getPlayersDetails(url) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const bearer_token = getLocalStorage(JWT_TOKEN);
    const bearer = 'Bearer ' + bearer_token;
    fetch(url, {
      method: 'GET',
      withCredentials: true,
      credentials: 'include',
      headers: {
          'Authorization': bearer
      } })
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