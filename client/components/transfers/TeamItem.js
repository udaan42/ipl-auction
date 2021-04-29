import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(50),
      height: theme.spacing(20),
    },
  },

  leagueItem: {
      marginLeft: 0,
      paddingLeft: 10,
      paddingTop: 10,
      backgroundColor: "#c4d7f5",
      transition: 'transform 250ms, box-shadow 250ms',
      '&:hover': {
          cursor: "pointer",
          transform: 'translateY(-10px)',
          boxShadow: '0 0 11px rgba(33,33,33,.2)'
      }
  },
  leaguePoint: {
      fontSize: 10,
      marginRight: 5
  },
  leagueName: {
      marginTop: 5
  },
  leaguePosition: {
    
  },
  label: {
      fontWeight: 400,
      fontSize: 14
  },
  leagueId: {
    fontSize: 14,
    fontStyle: "italic"
  },
  copyLink: {
    fontSize: 14
  }
}));

export default function TeamItem(props) {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = () => {
    let url = `/transfers/${props.item.leagueId}`
    history.push(url);
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.leagueItem} elevation={1} onClick={handleClick}>
          <Typography className={classes.leagueName} variant="h6" align="center">
              {props.item.leagueName}
          </Typography> 
          <Typography  variant="subtitle1" >
              <span className={classes.leagueId}>League code - {props.item.leagueId}</span>
          </Typography> 
          <Typography  variant="subtitle1" >
              <span className={classes.label}>Your points -</span> {props.item.points}
          </Typography> 
      </Paper>
    </div>
  );
}