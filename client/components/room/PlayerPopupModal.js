import React from 'react';
import { Modal} from 'react-bootstrap';
import PlayerTable from './PlayerTable';

export default function PlayerPopupModal(props){

    const handleClose = () => {
        props.onExit();
    }  

    return(
        <Modal show={props.show} onHide={handleClose}>
            <PlayerTable data={props.data}/>
        </Modal>)
}
