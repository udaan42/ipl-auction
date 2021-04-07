import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import RefreshIcon from '@material-ui/icons/Refresh';
import _ from 'lodash';
import { useHistory } from "react-router-dom";
import { Col, Button, Row } from 'react-bootstrap';
import LiveTable from './LiveTable';

import { ROLE_PLAYER, ROLE_MODERATOR } from '../../constants/constants';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    title:{
        // textAlign: "center",
        fontWeight: 500,
        marginBottom: 25,
        marginLeft: 15
    },
    subTitle:{
        textAlign: "center",
        fontWeight: 700,
        marginBottom: 10
    },
    table: {
        minWidth: 650,
        backgroundColor: '#fff5f5'
    },
    overseasIcon: {
        fontSize: "small"
    },
    liveTable:{
        marginBottom: 25
    },
    refreshBtn:{
        marginBottom: 15
    }
}));

export default function Live(props) {
    const classes = useStyles();
    const history = useHistory();

    let standings = [];
    if(!_.isEmpty(props.detail)){
      standings = props.detail.leagueUsers;
    }

    const handleClick = () => { props.reload()};

    return (
      <div className={classes.root}>
        <Typography variant="h6" className={classes.title}> {(props.detail) ? props.detail.leagueName: ""}</Typography>
        <Button variant="info" className={classes.refreshBtn} onClick={handleClick}> Refresh</Button>
        <Row>
            {standings.map((item)=>{
            if(item.leagueRole == ROLE_PLAYER){         
              return(
                    <Col md= {3} className={classes.liveTable}>
                        <Typography variant="subtitle1" className={classes.subTitle}> {item.teamName}</Typography>
                         <LiveTable rows={item.playersSquad}/>                       
                    </Col>
              )
            }  
        })}
        </Row>
      </div>
    );
}

