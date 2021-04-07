import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import CreateLeagueForm from './CreateLeagueForm';
import { API_ENDPOINT, USER_ID, JWT_TOKEN } from '../../config/config';
import { getLocalStorage } from '../../utils/storageUtil';
import axios from 'axios';
import { ROLE_PLAYER, ROLE_MODERATOR } from '../../constants/constants';

export default function CreateLeagueModal(props) {
  
    const handleClose = () => {
        props.onExit();
    }  

    const submitForm = (formProps) =>  {
      console.log(formProps)
      if(props.form == 1 && props.show){
        props.onNext();
      }
    }

    const switchType = () => {
        props.onChangeFormType();
    }

    const apiCall = (data) => {
      console.log(data)
      const bearer_token = getLocalStorage(JWT_TOKEN);
      const bearer = 'Bearer ' + bearer_token;
      const userId = getLocalStorage(USER_ID);
      const headers = {
        'X-UserId': userId,
        'Authorization': bearer
      }
      const url = `${API_ENDPOINT}/iplauction/league/`;
        // POST CALL
        axios.post(url, data, {
          headers: headers
        })
        .then((response) => {
          window.location.reload();
          console.log(response)
        })
        .catch((error) => {
           console.log(error);
        });
    }

    const nextClick = (leagueName, selectedOption, selectedTeam, teamName) => {
      if(props.form == 1 && props.show){
        props.onNext();
      }else{
        let data = {};
        const userId = getLocalStorage(USER_ID);
        if(selectedOption.value == ROLE_MODERATOR){
          data = {
            "leagueName": leagueName,
            "leagueUsers": [
                {
                  "teamName": teamName,
                  "leagueRole": selectedOption.value
                }
            ],
            "isActive": true
          }
          apiCall(data);
          props.onExit();
        }else if(props.form == 2 ){
          props.onNext();
        }else{
          data = {
            "leagueName": leagueName,
            "leagueUsers": [
                {
                  "teamName": teamName,
                  "leagueRole": selectedOption.value
                }
            ],
            "isActive": true
          }
          apiCall(data);
          props.onExit();  
        }
      } 
    }
  
    return (
      <>
        <Modal show={props.show} onHide={handleClose}>
            {<CreateLeagueForm form={props.form} onSubmit={submitForm} buttonClick={nextClick} errorMessage={null} joinAnotherLeague={switchType}/>}
        </Modal>
      </>
    );
  }