import { useState, useEffect } from "react";
import { API_URL, JWT_TOKEN, USER_ID } from '../config/config';
import { getLocalStorage } from '../utils/storageUtil';

export function getTransfers(url, id, refresh) {
  const [data, setData] = useState({
    transfers: null
  });

  useEffect(() => {
    const bearer_token = getLocalStorage(JWT_TOKEN);
    const bearer = 'Bearer ' + bearer_token;
    const userId = getLocalStorage(USER_ID);
    fetch(url, {
      method: 'GET',
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Authorization': bearer,
        'X-LeagueId': id,
        'X-UserId': userId
    } })
      .then(async response => {
        const data = await response.json()
        setData({
            transfers: data.payload.transferRequests,
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
  }, [url, id, refresh]);

  return data;
}

export function getLeagueTransfers(url) {
  
    const bearer_token = getLocalStorage(JWT_TOKEN);
    const bearer = 'Bearer ' + bearer_token;
    fetch(url, {
      method: 'GET',
      withCredentials: true,
      credentials: 'include',
      headers: {
          'authorisation': bearer
      } })
      .then(async response => {
        const data = await response.json()
        return data;
      })
      .catch(error => {
        //fetch throws an error only on network failure or if anything prevented the request from completing
        console.log(error);
      })
   
  }