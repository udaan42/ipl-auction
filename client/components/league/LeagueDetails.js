import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import _ from 'lodash';
import { useHistory } from "react-router-dom";
import { Col, Button, Row } from 'react-bootstrap';
import FlightIcon from '@material-ui/icons/Flight';
import { ROLE_PLAYER, ROLE_MODERATOR, PLAYER_OVERSEAS } from '../../constants/constants';

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
    // textAlign: "center",
    fontWeight: 500,
    marginBottom: 10,
    marginLeft: 15
  },
  leagueID:{
    textAlign: "center",
    fontWeight: 400,
    marginBottom: 10,
    fontStyle: "italic"
  },
  modName:{
    fontWeight: 400
  },
  rank:{
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '10%',
    flexShrink: 0,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '25%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    flexBasis: '25%'
  },
  headingRank:{
    fontWeight: 500,
    flexBasis: '24.5%',
    fontSize: theme.typography.pxToRem(15),

  },
  headingName:{
    fontWeight: 500,
    flexBasis: '24%',
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeadingTeam: {
    fontWeight: 500,
    flexBasis: '24%',
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeadingScore: {
    fontWeight: 500,
    fontSize: theme.typography.pxToRem(15),
  },
  table: {
    minWidth: 650,
    backgroundColor: '#fff5f5'
  },
  roomButton: {
    margin: 20,
    // marginLeft: "44%"
  },
  overseasIcon: {
    fontSize: "small"
  },
  captain: {
    fontWeight: 700
  },
  liveBtn: {
    marginLeft: 35
  }
}));

export default function LeagueDetails(props) {
    const classes = useStyles();
    const history = useHistory();
    const [expanded, setExpanded] = React.useState(false);
  
    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

    let standings = [];
    if(!_.isEmpty(props.detail)){
      standings = props.detail.leagueUsers;
    }

    const handleClick = (id) => { console.log(id)};

    const handleEnterRoom = (id) => {
      let url = `/rooms/${id}`
      history.push(url);
    }

    const handleEnterTeam = (id) => {
      let url = `/my-teams/${id}`
      history.push(url);
    }

    const handleLiveRoom = (id) => {
      let url = `/live/${id}`
      history.push(url);
    } 

    const displayButton = () => {
      if(props.detail){
        if(props.detail.leagueStatus != "ENDED"){
          return (
            <Row className={classes.roomButton}>
                <Button variant="secondary" onClick={()=>{handleEnterRoom(props.detail.leagueId)}}> Enter Auction Room</Button>
                <Button variant="info" className={classes.liveBtn} onClick={()=>{handleLiveRoom(props.detail.leagueId)}}> View Live Squad details</Button>
            </Row>
          )
        }else{
          return (
            <Row className={classes.roomButton}>
                <Button variant="secondary" onClick={()=>{handleEnterTeam(props.detail.leagueId)}}> View/ Change your playing 11</Button>
                <Button variant="info" className={classes.liveBtn} onClick={()=>{handleLiveRoom(props.detail.leagueId)}}> View Live Squad details</Button>
            </Row>
          )
        }
      }
    }

    const getModeratorNames = () => {
      let modUsers = standings.filter((item)=> {
        return (item.leagueRole == ROLE_MODERATOR)
      })

      return modUsers.map((item) => {
        return(
          <span className={classes.modName}>{item.userName}</span> 
        )
      })
    }

  
    return (
      <div className={classes.root}>
        <Typography variant="h6" className={classes.title}> {(props.detail) ? props.detail.leagueName: ""}</Typography>
        <Typography variant="subtitle1" className={classes.subTitle}> League ID - {(props.detail) ? (<span className={classes.leagueID}>{props.detail.leagueId}</span>): ""}</Typography>
        <Typography variant="subtitle1" className={classes.subTitle}> Moderators - {getModeratorNames()}</Typography>
        {displayButton()}
        <Col md={8}>
        <Accordion>
            <AccordionSummary
                aria-controls="title-content"
                id="league-title"
            >
                <Typography className={classes.headingRank}>Position</Typography>
                <Typography className={classes.headingName}>Name</Typography>
                <Typography className={classes.secondaryHeadingTeam}>Team</Typography>
                <Typography className={classes.secondaryHeadingScore}>Score</Typography>
            </AccordionSummary>
        </Accordion>
        {standings.map((item)=>{
            if(item.leagueRole == ROLE_PLAYER){
              const squad = item.playersSquad.filter((player)=> player.playing);
              return(
                <Accordion >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id={item.userName}
                        onClick={()=> {handleClick(item.userName)}}
                    >
                        <Typography className={classes.heading}>-</Typography>
                        <Typography className={classes.heading}>{item.userName} </Typography>
                        <Typography className={classes.secondaryHeading}>{item.teamName}</Typography>
                        <Typography className={classes.secondaryHeading}>{item.points}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <TableContainer component={Paper}>
                            <Table className={classes.table} size="small" aria-label="a dense table">
                                <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="left">Role</TableCell>
                                    <TableCell align="right">Points</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                    {squad.map((row) => (
                                        <TableRow key={row.name}>
                                            <TableCell component="th" scope="row">
                                                {row.playerName} {row.playerRace == PLAYER_OVERSEAS ? <FlightIcon className={classes.overseasIcon} />: ""}{row.captain? <span className={classes.captain}> - C</span>: ""}
                                            </TableCell>
                                            <TableCell align="left">{row.playerRole}</TableCell>
                                            <TableCell align="right">{row.points}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </AccordionDetails>
                </Accordion>
               
              )
            }
            
        })}
        </Col>
      </div>
    );
}

