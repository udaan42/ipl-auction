import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';


function getPriceValue(value){
    if(value < 100){
        return `${value} lakhs`
    }else if(value >= 100){
       let currency = value / 100;
       if(currency == 1){
           return `1 crore`
       }else{
           return `${currency} crores`
       }
    }
}

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
}
  
function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}


const headCells = [
  { id: 'playerName', numeric: false, disablePadding: false, label: 'Name', wide: true , sort: true},
  { id: 'teamName', numeric: false, disablePadding: false, label: 'Team', wide: true , sort: true},
  { id: 'playerRole', numeric: false, disablePadding: false, label: 'Role', wide: false , sort: true },
  { id: 'basePrice', numeric: false, disablePadding: false, label: 'Base Price', wide: false, sort: true },
  { id: 'bagNumber', numeric: false, disablePadding: false, label: 'Bag Order', wide: false , sort: true},
  { id: 'bagCode', numeric: false, disablePadding: false, label: 'Bag Name', wide: false , sort: true},
  { id: 'matchesPlayed', numeric: true, disablePadding: false, label: 'Matches', wide: false },
  { id: 'runsScored', numeric: true, disablePadding: false, label: 'Runs', wide: false },
  { id: 'highestScore', numeric: true, disablePadding: false, label: 'HS', wide: false },
  { id: 'noOfFifties', numeric: true, disablePadding: false, label: '50s', wide: false },
  { id: 'battingStrikeRate', numeric: true, disablePadding: false, label: 'Bat SR', wide: false },
  { id: 'noOfWickets', numeric: true, disablePadding: false, label: 'Wickets', wide: false },
  { id: 'bowlingEconomy', numeric: true, disablePadding: false, label: 'Economy', wide: false },
  { id: 'bowlingStrikeRate', numeric: true, disablePadding: false, label: 'Bowl SR', wide: false },
  { id: 'noOfFourWickets', numeric: true, disablePadding: false, label: '4 Wkts', wide: false },
  { id: 'noOfCatches', numeric: true, disablePadding: false, label: 'Catches', wide: false },
  { id: 'noOfStumpings', numeric: true, disablePadding: false, label: 'Stumpings', wide: false },
];

function EnhancedTableHead(props) {
  const { classes,  order, orderBy,  onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
            className={headCell.wide ? classes.tableCell: classes.tableHeadItem}
            component="th"
          >
            {headCell.sort ? <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>: headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: 25
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 550
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
      paddingBottom: 8,
      paddingLeft: 10,
      paddingRight: 10
  },
  tableCell:{
      minWidth: 150,
      width: "auto",
      paddingTop: 8,
      paddingBottom: 8 
  },
  tableHeadItem:{
      paddingTop: 8,
      paddingBottom: 8
  }
}));

export default function PlayersTable(props) {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('teamName');
    const [page, setPage] = React.useState(0);
    const [selected, setSelected] = React.useState([]);
    const [rowsPerPage, setRowsPerPage] = React.useState(15);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.rows.length - page * rowsPerPage);

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),
        );
        }
        setSelected(newSelected);
    };


  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size='medium'
            aria-label="enhanced table"
            stickyHeader
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
            {stableSort(props.rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.playerName);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.playerName)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.playerId}
                      selected={isItemSelected}
                    >
                      <TableCell className={classes.rowContent} id={labelId} scope="row">
                        {row.playerName}
                      </TableCell>
                      <TableCell className={classes.rowContent} >{row.teamName}</TableCell>
                      <TableCell className={classes.rowContent} >{row.playerRole}</TableCell>
                      <TableCell className={classes.rowContent} align="center">
                        {getPriceValue(row.basePrice)}
                      </TableCell>
                      <TableCell className={classes.rowContent} align="center">{parseInt(row.bagNumber)}</TableCell>
                      <TableCell className={classes.rowContent} align="center">{row.bagCode}</TableCell>
                      <TableCell className={classes.rowContent} align="right">{row.matchesPlayed}</TableCell>
                      <TableCell className={classes.rowContent} align="right">{row.runsScored}</TableCell>
                      <TableCell className={classes.rowContent} align="right">{row.highestScore}</TableCell>
                      <TableCell className={classes.rowContent} align="right">{row.noOfFifties}</TableCell>
                      <TableCell className={classes.rowContent} align="right">{row.battingStrikeRate}</TableCell>
                      <TableCell className={classes.rowContent} align="right">{row.noOfWickets}</TableCell>
                      <TableCell className={classes.rowContent} align="right">{row.bowlingEconomy}</TableCell>
                      <TableCell className={classes.rowContent} align="right">{row.bowlingStrikeRate}</TableCell>
                      <TableCell className={classes.rowContent} align="right">{row.noOfFourWickets}</TableCell>
                      <TableCell className={classes.rowContent} align="right">{row.noOfCatches}</TableCell>
                      <TableCell className={classes.rowContent} align="right">{row.noOfStumpings}</TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                    <TableRow style={{ height: (33) * emptyRows }}>
                    <TableCell colSpan={6} />
                    </TableRow>
                )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[15, 25,50, 100]}
          component="div"
          count={props.rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
