import { useState, useEffect } from "react";
import { API_URL, JWT_TOKEN, USER_ID, BAG } from '../config/config';
import { getLocalStorage, setLocalStorage } from '../utils/storageUtil';
import { useHistory, useParams } from 'react-router-dom';
import _ from 'lodash';

export default function getPlayerBagDetails(url, bagNumber) {
  const [players, setPlayers] = useState({
    players: [],
    reload: false,
    bagNumber: 0
  });

  const { id } = useParams();
  const bagNameKey = `bagName#${id}`;
  const bagData = `bagData#${id}`;

  useEffect(() => {

    let bagName = getLocalStorage(bagNameKey);
    let arrayData = getLocalStorage(bagData);
    if(bagName == bagNumber && arrayData){
      setPlayers({
        players: arrayData,
        error: false,
        bagNumber: bagNumber
      })
    }else{
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
          const data = await response.json();
          let playerData = _.shuffle(data.payload.playerInfos);
          setLocalStorage(bagNameKey, bagNumber);
          setLocalStorage(bagData, playerData);
          setPlayers({
            players: playerData,
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
    } 
  }, [url, bagNumber]);

  return players;
}