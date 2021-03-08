import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import JoinLeagueForm from './JoinLeagueForm';

export default function JoinLeagueModal(props) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => {
        props.onExit();
    }
    const handleShow = () => setShow(true);

    const submitForm = (formProps) =>  {
        console.log(formProps);
    }

    const switchType = () => {
        props.onChangeFormType();
    }
  
    return (
      <>
        <Modal show={props.show} onHide={handleClose}>
            <JoinLeagueForm onSubmit={submitForm} errorMessage={null} joinAnotherLeague={switchType}/>
        </Modal>
      </>
    );
  }