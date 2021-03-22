import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import JoinLeagueForm from './JoinLeagueForm';
import { API_ENDPOINT, USER_ID } from '../../config/config';
import { getLocalStorage } from '../../utils/storageUtil';
import axios from 'axios';


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
      let secondUser = '2ee54e87-9652-4b04-8b1d-70323de443d1';
      const headers = {
        'X-UserId': '7614773c-aa27-4472-b54d-ef8eb6d54157',
        'X-LeagueId': leagueId
      }
      const url = `${API_ENDPOINT}iplauction/league/joinLeague/`;
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

    const nextClick = (leagueId, selectedOption, selectedTeam) => {
      const userId = getLocalStorage(USER_ID);
      if(selectedOption.value == "moderator"){
        props.onExit();
        let data = {
          "leagueRole": selectedOption.value,
          "teamName": selectedTeam.value,
          "points": 0
        }
        apiCall(data, userId, leagueId);
      }else if(props.form == 2 ){
        props.onNext();
      }else{
        let data = {
          "leagueRole": selectedOption.value,
          "teamName": selectedTeam.value,
          "points": 0
        }
        apiCall(data, userId, leagueId);
  
        props.onExit();  
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