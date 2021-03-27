import { useState, useEffect } from "react";
import { API_URL, JWT_TOKEN, USER_ID } from '../config/config';
import { getLocalStorage } from '../utils/storageUtil';

export default function getLeagueData(url, userId) {
  const [data, setData] = useState([]);

  async function getData() {
    const bearer_token = getLocalStorage(JWT_TOKEN);
    const bearer = 'Bearer ' + bearer_token;
    const userId = getLocalStorage(USER_ID);
    const response = await fetch(url, {
      method: 'GET',
      withCredentials: true,
      credentials: 'include',
      headers: {
          'Authorization': bearer,
          'X-UserId': userId
      } });
    const data = await response.json();
    setData(data.payload.leagueInfos);
  }

  useEffect(() => {
    getData();
  }, []);

  return data;
}