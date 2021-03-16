import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import CreateLeagueForm from './CreateLeagueForm';
import { API_ENDPOINT, USER_ID } from '../../config/config';
import { getLocalStorage } from '../../utils/storageUtil';
import axios from 'axios';

export default function CreateLeagueModal(props) {
  
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
      const url = `${API_ENDPOINT}iplauction/league/`;
        // POST CALL
        axios.post(url, data)
        .then((response) => {
           console.log(response)
        })
        .catch((error) => {
           console.log(error);
        });
    }

    const nextClick = (leagueName, selectedOption, selectedTeam) => {
      let data = {};
      const userId = getLocalStorage(USER_ID);
      if(selectedOption.value == "moderator"){
        data = {
          "leagueName": leagueName,
          "leagueUser": [
            {
                "userId": userId,
                "userName": "bcvb",
                "userRole": "admin",
                "leagueRole": selectedOption.value,
                "teamName": selectedTeam.value,
                "points": 0
              }
          ],
          "isActive" : true 
        }
        apiCall(data);
        props.onExit();
      }else if(props.form == 2 ){
        props.onNext();
      }else{
        data = {
          "leagueName": leagueName,
          "leagueUser": [
            {
                "userId": userId,
                "userName": "bcvb",
                "userRole": "admin",
                "leagueRole": selectedOption.value,
                "teamName": selectedTeam.value,
                "points": 0
              }
          ],
          "isActive" : true
        }
        apiCall(data);
        props.onExit();  
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