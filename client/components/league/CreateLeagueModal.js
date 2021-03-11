import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import CreateLeagueForm from './CreateLeagueForm';
import { USER_ID } from '../../config/config';
import { getLocalStorage } from '../../utils/storageUtil';

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

    const nextClick = (leagueName, selectedOption, selectedTeam) => {
      const userId = getLocalStorage(USER_ID);
      if(selectedOption.value == "moderator"){
        props.onExit();
        let data = {
          "leagueName": leagueName,
          "userId": userId,
          "userName": "test",
          "userRole": "admin",
          "auctionRole": selectedOption.value,
          "teamName": selectedTeam.value
        }
      }else if(props.form == 2 ){
        props.onNext();
      }else{
        let data = {
          "leagueName": leagueName,
          "userId": userId,
          "userName": "test",
          "userRole": "admin",
          "auctionRole": selectedOption.value,
          "teamName": selectedTeam.value
        }
        console.log(data);
  
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