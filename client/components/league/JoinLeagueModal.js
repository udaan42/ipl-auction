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

    const apiCall = (data) => {
      const url = `${API_ENDPOINT}iplauction/league/joinLeague/${data.leagueId}`;
        // POST CALL
        axios.post(url, data)
        .then((response) => {
           console.log(response)
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
          "leagueId": leagueId,
          "userId": userId,
          "userName": "test",
          "userRole": "player",
          "leagueRole": selectedOption.value,
          "teamName": selectedTeam.value,
          "points": 0
        }
        apiCall(data);
      }else if(props.form == 2 ){
        props.onNext();
      }else{
        let data = {
          "leagueId": leagueId,
          "userId": userId,
          "userName": "test",
          "userRole": "player",
          "leagueRole": selectedOption.value,
          "teamName": selectedTeam.value,
          "points": 0
        }
        apiCall(data);
  
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