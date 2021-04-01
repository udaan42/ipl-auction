import React from 'react';
import PropTypes from 'prop-types';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import FlightIcon from '@material-ui/icons/Flight';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';

const headCells = [
  { id: 'playerName', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'teamName', numeric: false, disablePadding: false, label: 'Team' },
  { id: 'playerRole', numeric: false, disablePadding: false, label: 'Role' },
  { id: 'points', numeric: true, disablePadding: false, label: 'Points' }
];

function EnhancedTableHead(props) {
  const { classes } = props;

  return (
    <TableHead>
      <TableRow>
        {props.value == "team" ? <TableCell padding="checkbox"></TableCell>:""}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
          >
            <TableSortLabel>
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
        {props.value == "squad" ? <TableCell padding="checkbox"></TableCell>:""}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired
};


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 550,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  rowContent: {
      paddingTop: 8,
      paddingBottom: 8
  },
  swapIcon: {
    '&:hover' :{
      cursor: "pointer"
    }
  },
  overseasIcon:{
    fontSize: "small"
  }
}));

const getPlayerRole = (role) => {
  if(role == "Batsman"){
    return "Bat"
  }else if(role == "Bowler"){
    return "Bowl"
  }else if(role == "Wicket Keeper"){
    return "WK"
  }else if(role == "All Rounder"){
    return "AR"
  }
}

export default function TeamTable(props) {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size='small'
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              value={props.value}
            />
            <TableBody>
              {props.rows
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.playerName}
                    >
                      {props.value == "team" ? <TableCell padding="checkbox">
                        <SwapHorizIcon onClick={() => props.itemSelect(row.playerName)} className={classes.swapIcon} />
                      </TableCell>:""}
                      <TableCell className={classes.rowContent} component="th" id={labelId} scope="row">
                        {row.playerName} {row.playerRace == 'F' ? <FlightIcon className={classes.overseasIcon} />: ""}
                      </TableCell>
                      <TableCell align="left">{row.teamName}</TableCell>
                      <TableCell align="left">{getPlayerRole(row.playerRole)}</TableCell>
                      <TableCell align="right">{row.points}</TableCell>
                      {props.value == "squad" ? <TableCell padding="checkbox">
                        <SwapHorizIcon onClick={() => props.itemSelect(row.playerName)} className={classes.swapIcon} />
                      </TableCell>:""}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
