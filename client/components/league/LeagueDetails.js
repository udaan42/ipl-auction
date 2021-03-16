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

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  title:{
    textAlign: "center",
    fontWeight: 500,
    marginBottom: 25
  },
  leagueID:{
    textAlign: "center",
    fontWeight: 400,
    marginBottom: 25,
    fontStyle: "italic"
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
  }
}));

export default function LeagueDetails(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
  
    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

    let standings = [];
    if(!_.isEmpty(props.detail)){
      standings = props.detail.leagueUsers;
    }
  
    return (
      <div className={classes.root}>
        <Typography variant="h4" className={classes.title}> {(props.detail) ? props.detail.leagueName: ""}</Typography>
        <Typography variant="h6" className={classes.title}> League ID - {(props.detail) ? (<span className={classes.leagueID}>{props.detail.leagueId}</span>): ""}</Typography>
        <Accordion>
            <AccordionSummary
                aria-controls="title-content"
                id="league-title"
            >
                <Typography className={classes.headingRank}>Rank</Typography>
                <Typography className={classes.headingName}>Name</Typography>
                <Typography className={classes.secondaryHeadingTeam}>Team</Typography>
                <Typography className={classes.secondaryHeadingScore}>Score</Typography>
            </AccordionSummary>
        </Accordion>
        {standings.map((item)=>{
            if(item.leagueRole == "player"){
              return(
                <Accordion expanded={expanded === item.teamName} onChange={handleChange(item.teamName)}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id={item.userName}
                    >
                        <Typography className={classes.heading}>{item.rank}</Typography>
                        <Typography className={classes.heading}>{item.userName}</Typography>
                        <Typography className={classes.secondaryHeading}>{item.teamName}</Typography>
                        <Typography className={classes.secondaryHeading}>{item.points}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <TableContainer component={Paper}>
                            <Table className={classes.table} size="small" aria-label="a dense table">
                                <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="right">Role</TableCell>
                                    <TableCell align="right">Points</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                    {item.playersSquad.map((row) => (
                                        <TableRow key={row.name}>
                                            <TableCell component="th" scope="row">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">{row.position}</TableCell>
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
      </div>
    );
}

