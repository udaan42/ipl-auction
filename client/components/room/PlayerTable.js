import React from 'react';
import { Table} from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import FlightIcon from '@material-ui/icons/Flight';

const useStyles = makeStyles((theme) => ({
    yourTable: {
        marginTop: 10
    },
    overseasIcon: {
        fontSize: "small"
    },
    playersTeam: {
        fontSize: 16,
        fontWeight: 600,
        marginLeft: 125
        // marginBottom: 15
    }
}));

const PlayerTable = (props) => {

    const classes = useStyles();
    const ids = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];

    const getPrice = (value) => {
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

    const getTableRows = () => {
        return ids.map((i, index)=> {
                if(props.data[i]){
                    return(
                        <tr>
                            <td>{i+1}</td>
                            <td>{props.data[i].playerName} {props.data[i].playerRace == 'F' ? <FlightIcon className={classes.overseasIcon} />: ""}</td>
                            <td>{props.data[i].playerRole}</td>
                            <td>{getPrice(props.data[i].soldPrice)}</td>
                        </tr>
                    )
                }else{
                    return(
                        <tr><td>{i+1}</td><td></td><td></td><td></td></tr>
                    )
                }
              
        })  
    }

    const getPurseBalance = () => {
        let total = 0;
        props.data.forEach(element => {
            total = total + element.soldPrice;
        });


        return (10000 - total) / 100;
    }

    const balance = getPurseBalance();

    return(
        <>
            <span className={classes.playersTeam}>Purse Remaining - {balance} crores</span>
            <Table striped bordered hover size="sm" className={classes.yourTable} >
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {getTableRows()}
                </tbody>
            </Table>
        </>
    )
}

export default PlayerTable;