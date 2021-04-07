import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import JoinLeagueForm from './JoinLeagueForm';
import { JWT_TOKEN, API_ENDPOINT, USER_ID } from '../../config/config';
import { getLocalStorage } from '../../utils/storageUtil';
import axios from 'axios';
import { ROLE_PLAYER, ROLE_MODERATOR } from '../../constants/constants';

export default function JoinLeagueModal(props) {
  
    const handleClose = () => {
        props.onExit();
    }

    const submitForm = (formProps) =>  {
      if(props.form == 1 && props.show){
        props.onNext();
      }
    }

    const switchType = () => {
        props.onChangeFormType();
    }

    const apiCall = (data, userId, leagueId) => {
      const bearer_token = getLocalStorage(JWT_TOKEN);
      const bearer = 'Bearer ' + bearer_token;
      const headers = {
        'X-UserId': userId,
        'X-LeagueId': leagueId,
        'Authorization': bearer
      }
      const url = `${API_ENDPOINT}/iplauction/league/joinLeague/`;
        // POST CALL
        axios.post(url, data, {
          headers: headers
        })
        .then((response) => {
           console.log(response);
           window.location.reload();
        })
        .catch((error) => {
           console.log(error);
        });
    }

    const nextClick = (leagueId, selectedOption, selectedTeam, teamName) => {
      if(props.form == 1 && props.show){
        props.onNext();
      }else{
        const userId = getLocalStorage(USER_ID);
        if(selectedOption.value == ROLE_MODERATOR){
          props.onExit();
          let data = {
            "leagueRole": selectedOption.value,
            "teamName": teamName,
            "points": 0
          }
          apiCall(data, userId, leagueId);
        }else if(props.form == 2 ){
          props.onNext();
        }else{
          let data = {
            "leagueRole": selectedOption.value,
            "teamName": teamName,
            "points": 0
          }
          apiCall(data, userId, leagueId);
          props.onExit();  
        }
      }  
    }
  
    return (
      <>
        <Modal show={props.show} onHide={handleClose}>
            <JoinLeagueForm form={props.form} onSubmit={submitForm} buttonClick={nextClick} errorMessage={null} joinAnotherLeague={switchType}/>
        </Modal>
      </>
    );
  }