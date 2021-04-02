import React from 'react';
import { Modal} from 'react-bootstrap';
import PlayerTable from './PlayerTable';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    playerTable:{
        marginTop: 100
    }
}))

export default function PlayerPopupModal(props){
    const classes = useStyles();

    const handleClose = () => {
        props.onExit();
    }  

    return(
        <Modal className={classes.playerTable} show={props.show} onHide={handleClose}>
            <PlayerTable data={props.data}/>
        </Modal>)
}
