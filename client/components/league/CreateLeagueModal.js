import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import CreateLeagueForm from './CreateLeagueForm';

export default function CreateLeagueModal(props) {
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
            <CreateLeagueForm onSubmit={submitForm} errorMessage={null} joinAnotherLeague={switchType}/>
          {/* <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CreateLeagueForm onSubmit={submitForm} errorMessage="None" />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer> */}
        </Modal>
      </>
    );
  }