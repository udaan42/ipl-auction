import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(50),
      height: theme.spacing(15),
    },
  },
  leagueItem: {
      marginLeft: 0,
      paddingLeft: 10,
      paddingTop: 10,
      backgroundColor: "#c4d7f5",
      '&:hover': {
          cursor: "pointer"
      }
  },
  leaguePoint: {
      fontSize: "small",
      marginRight: 5
  },
  leagueName: {
      marginTop: 15
  },
  leaguePosition: {
    
  },
  label: {
      fontWeight: 400
  }
}));

export default function LeagueItem(props) {
  const classes = useStyles();

  const handleClick = () => {
      console.log("Click")
  }

  return (
      <div className={classes.root}>
        <Paper className={classes.leagueItem} elevation={3} onClick={handleClick}>
            {/* <FiberManualRecordIcon className={classes.leaguePoint} /> */}
            <Typography className={classes.leagueName} variant="h6" align="center">
                {/* <FiberManualRecordIcon className={classes.leaguePoint} /> */}
                {props.item.name}
            </Typography> 
            <Typography  variant="subtitle1" align="center">
                <FiberManualRecordIcon className={classes.leaguePoint} />
                <span className={classes.label}>Your rank -</span> {props.item.rank}
            </Typography> 
        </Paper>
      </div>
  );
}