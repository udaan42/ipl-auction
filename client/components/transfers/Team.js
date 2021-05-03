import React from 'react';
import { Button, Container, Row, Table, Col } from 'react-bootstrap';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TeamTable from './TeamTable';
import _ from 'lodash';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ROLE_PLAYER, ROLE_MODERATOR, TYPE_BATSMAN, TYPE_BOWLER, TYPE_ALL_ROUNDER, TYPE_WICKET_KEEPER, PLAYER_OVERSEAS, filterOptions } from '../../constants/constants';
import { getPurseBalance, getPrice } from '../../utils/priceUtil';

import { getLocalStorage } from '../../utils/storageUtil';
import CancelIcon from '@material-ui/icons/Cancel';

import { API_ENDPOINT, USER_ID, JWT_TOKEN } from '../../config/config';
import axios from 'axios'

import { getPlayerData } from '../../utils/playerUtil';
import LockIcon from '@material-ui/icons/Lock';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';

const styles = {
    header:{
        fontWeight: 500,
        marginBottom: 10
    },
    subHeader: {
        marginBottom: 5,
        fontSize: 16
    },
    titleValue: {
        fontWeight: 600,
        marginLeft: 5
    },
    transfersTitle: {
        fontWeight: 600
    },
    filterArea: {

    },
    unsoldFilter: {
        marginBottom: 10,
        marginTop: -25,
        float: "right"
    },
    transferContent:{
        marginBottom: 15
    },
    transferLabel: {
        fontWeight: 600,
        fontSize: 16
    },
    transferPlayer:{
        fontSize: 16
    },
    transferBid:{
        marginLeft: 5,
        marginRight: 5,
        marginTop: -6
    },
    list: {
        padding : 0,
        marginTop: 10
    },
    listItem: {
        marginLeft: 15,
        fontSize: 16
    },
    bidLabel: {
        fontSize: 16
    },
    submitBtn: {
        marginRight: 20
    },
    cancelIcon:{
        fontSize: "medium",
        marginLeft: 5,
        marginBottom: 2,
        cursor: "pointer"
    },
    transferHistoryContent: {

    },
    lockIcon: {
        fontSize: "medium",
        marginBottom: 2
    },
    lockBtn: {
        fontSize: 18
    },
    transferTable:{
        fontSize: 15,
        borderBottom: "solid 1px #ddd" 
    },
    cancelRequest:{
        cursor: "pointer"
    }
    
};

class Team extends React.Component{

    constructor(props){
        super(props)
        this.state={
            detail: [],
            squad: [],
            unsold: [],
            error: false,
            errorMessage: "",
            selectedPlayer: null,
            transfers: [],
            transfersHistory: [],
            transferPopUp: false,
            transferOut: null,
            transferIn: null,
            bid: 0,
            transferInitiated: false,
            filter: ""
        }
    }

    
    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.detail != nextProps.detail) {

            if(nextProps.detail.playersSquad){
                let team =  [...nextProps.detail.playersSquad];
     
                let wk = team.filter((item)=> item.playerRole == TYPE_WICKET_KEEPER);
                let bat = team.filter((item)=> item.playerRole == TYPE_BATSMAN);
                let bowl = team.filter((item)=> item.playerRole == TYPE_BOWLER);
                let ar = team.filter((item)=> item.playerRole == TYPE_ALL_ROUNDER);
                let overseas = team.filter((item)=> item.playerRace == PLAYER_OVERSEAS);

                return {
                    detail: nextProps.detail,       
                    squad : team,
                    wk: wk.length,
                    bat: bat.length,
                    bowl: bowl.length,
                    ar: ar.length,
                    overseas: overseas.length
                };
            }   
        }

        if (prevState.unsold != nextProps.unsoldPlayers && nextProps.unsoldPlayers) {
            return {
                unsold: nextProps.unsoldPlayers
            }
        }

        if (prevState.transfersHistory != nextProps.transfers){
            let squad = prevState.squad;

            if(nextProps.transfers){
                return {
                    transfersHistory: nextProps.transfers
                }
            }
            
        }

        // Return null to indicate no change to state.
        return null;
    }

    criteriaCheck = (player) => { 
        let team = [...this.state.squad];
        this.state.transfersHistory.map((transfer)=> {
            _.remove(team, ['playerId', transfer.transferOutPlayerId]);
            team.push(getPlayerData(transfer.transferInList[0].playerId));
        })

        let wk = team.filter((item)=> item.playerRole == TYPE_WICKET_KEEPER).length;
        let bat = team.filter((item)=> item.playerRole == TYPE_BATSMAN).length;
        let bowl = team.filter((item)=> item.playerRole == TYPE_BOWLER).length;
        let ar = team.filter((item)=> item.playerRole == TYPE_ALL_ROUNDER).length;
        let overseas = team.filter((item)=> item.playerRace == PLAYER_OVERSEAS).length;


        if( (wk < 2 && player.playerRole != TYPE_WICKET_KEEPER ) || (wk >= 3 && player.playerRole == TYPE_WICKET_KEEPER )){
            this.setState({
                error: true,
                errorMessage: "You dont meet the Wicket Keeper criteria"
            })
            
        }else if( (bat < 3  && player.playerRole != TYPE_BATSMAN) || (bat >= 5 && player.playerRole == TYPE_BATSMAN)){
            this.setState({
                error: true,
                errorMessage: "You dont meet the Batsmen criteria"
            })

        }else if( (bowl < 3  && player.playerRole != TYPE_BOWLER) || (bowl >= 5 && player.playerRole == TYPE_BOWLER)){
            this.setState({
                error: true,
                errorMessage: "You dont meet the Bowler criteria"
            })
            
        }else if( (ar < 3  && player.playerRole != TYPE_ALL_ROUNDER) || (ar >= 5 && player.playerRole == TYPE_ALL_ROUNDER)){
            this.setState({
                error: true,
                errorMessage: "You dont meet the All Rounder criteria"
            })
        }else if( (overseas < 5  && player.playerRace != PLAYER_OVERSEAS) || (overseas >= 6 && player.playerRace == PLAYER_OVERSEAS)){
            this.setState({
                error: true,
                errorMessage: "You dont meet the Overseas players criteria"
            })
        }else{
            return true;
        }

        return false;

    }


    onSquadSelect = (item) => {
        if(!this.state.transferInitiated){
            let tempSquad = [...this.state.squad];
            let selectedItem = _.find(tempSquad, ['playerName', item]);
            
            let transferOut = [...this.state.transfers];
            transferOut.push(selectedItem);
            _.remove(tempSquad,['playerName', item]);

            this.setState({
                squad: tempSquad,
                transferOut: selectedItem,
                transfers: transferOut,
                transferInitiated: true
            }) 
        }        
    }

    unsoldPlayerSelected = (item) => {
        let unsold = [...this.state.unsold];
        let selectedItem = _.find(unsold, ['playerName', item]);

        _.remove(unsold,['playerName', item]);

        if(this.state.squad.length >= 15 || !this.state.transferInitiated){
            this.setState({
                error: true,
                errorMessage: "You need to transfer out a player first"
            })
        }else{
            if(this.criteriaCheck(selectedItem)){
                this.props.updateUnsold(item);
                this.setState({
                    transferIn: selectedItem
                }) 
            }
        }
        
    }

    closePopUp = () => {
        this.setState({
            selectedPlayer: null,
            transferPopUp: false
        })
    }


    handleErrorClose = () => {
        this.setState({
            error: false,
            errorMessage: ""
        })
    }

    handleUnsoldFilter = (value)=> {
        this.props.updateFilter(value);
        this.setState({
            filter: value
        })
    }


    handleChange = (e) => {
        const squad = this.getSquad();
        let transferTotal = this.getTransferTotal(this.state.transfersHistory);
        const balance = getPurseBalance(squad) - transferTotal;
        let value = e.target.value;

        if(this.state.transferIn){
            if(value < this.state.transferIn.basePrice){
                value = this.state.transferIn.basePrice
            }
        }
        
        if(value > balance){
            value = balance
        }
        this.setState({
            bid: value
        })
    }

    submitTransfers = () => {
        let data = {};
        data.transferInList = [];
        const squad = this.getSquad();
        let transferTotal = this.getTransferTotal(this.state.transfersHistory);
        const balance = getPurseBalance(squad) - transferTotal;
        if(this.state.transferIn){
            let temp = {
                "playerId": this.state.transferIn.playerId,
                "priority": 1
            }
            data.transferInList.push(temp)
        }else{
            this.setState({
                error: true,
                errorMessage: "You need to select a replacement player"
            })
            return;
        }
        if(parseInt(this.state.bid) <= 0){
            this.setState({
                error: true,
                errorMessage: "You need to specify the bidding amount"
            })
            return;
        }
        if(parseInt(this.state.bid) > balance){
            this.setState({
                error: true,
                errorMessage: "You dont enough purse balance for the bid. Please check"
            })
            return;
        }
        
        data.bidAmount = parseInt(this.state.bid);
        data.transferOutAmount = this.state.transferOut.soldPrice;
        data.userId = getLocalStorage(USER_ID);
        data.transferOutPlayerId = this.state.transferOut.playerId;

        const url = `${API_ENDPOINT}/iplauction/league/addTransferRequest/${this.props.leagueId}`;
        const bearer_token = getLocalStorage(JWT_TOKEN);
        const bearer = 'Bearer ' + bearer_token;

        const headers = {
            'Authorization': bearer
        }

        axios.post(url, data, {
            headers: headers
        })
        .then((response) => {
            this.props.refreshTransfers();
            this.setState({
                transfers: [],
                transferOut: null,
                transferIn: null,
                transferInitiated: false
            })
        })
        .catch((error) => {
            console.log(error);
        });
        
        
    }

    getMinimumPrice = () => {
        let minimum = 0;
        if(this.state.transferIn){
            minimum = Math.max(minimum, this.state.transferIn.basePrice); 
        }
        return minimum;
    }

    getTransfersList = (balance) => {
        let min = this.getMinimumPrice();
        if(this.state.transferOut){
            return(
                <Row className={this.props.classes.transferContent}>
                    <Col md={2}>
                        <span className={this.props.classes.transferLabel}>Transfer Out - </span>
                        <ol className={this.props.classes.list}>
                            <span className={this.props.classes.transferPlayer}>{this.state.transferOut.playerName}</span>    
                        </ol> 
                    </Col>
                    <Col md={2}>
                        <span className={this.props.classes.transferLabel}>Transfer In - </span>
                        <ol className={this.props.classes.list}>
                            {this.state.transferIn ? <span className={this.props.classes.transferPlayer}>
                                        {this.state.transferIn.playerName}
                                        <CancelIcon className={this.props.classes.cancelIcon} onClick={()=>{this.cancelBtnClicked(this.state.transferIn.playerName)}} />
                            </span>: ""}
                        </ol>
                    </Col>
                    <Col md={2}>
                        <span className={this.props.classes.transferLabel}>Your Bid - </span>
                        <ol className={this.props.classes.list}>
                            <TextField
                                id="standard-number"
                                label=""
                                type="number"
                                InputLabelProps={{
                                    shrink: true
                                }}
                                InputProps={{
                                    inputProps: {
                                    max: balance,
                                    min: min,
                                    step: 5
                                    }
                                }}
                                onChange={this.handleChange}
                                className={this.props.classes.transferBid}
                            /> 
                            <span className={this.props.classes.bidLabel}> lakhs</span>
                        </ol>
                    </Col>
                    <Col md={4}>
                        <Button className={this.props.classes.submitBtn} variant="info" onClick={this.submitTransfers}>Submit</Button>
                        <Button className={this.props.classes.cancelBtn} variant="secondary" onClick={this.cancelTransfers}>Cancel</Button>
                    </Col>
                </Row>
            )
        }
    }

    cancelRequest = (transfer) => {

        let url = `${API_ENDPOINT}/iplauction/league/removeUserTransferRequest/${transfer.transferOutPlayerId}`;
        const bearer_token = getLocalStorage(JWT_TOKEN);
        const bearer = 'Bearer ' + bearer_token;
        let userId = getLocalStorage(USER_ID);
        let leagueId = this.props.leagueId;
        const headers = {
            'Authorization': bearer,
            'X-LeagueId': leagueId,
            'X-UserId': userId,
        }
        axios.delete(url, {headers})
        .then((response) => {
            console.log(response)
            this.props.refreshTransfers();
        })
        .catch((error) => {
            console.log(error);
        });
    }

    getTransfersHistory = () => {
        if(this.state.transfersHistory){
            return(
                <Row>
                    <Col md={6}>
                    <Table striped hover size="md" className={this.props.classes.transferTable} >
                        <thead>
                            <tr>
                                <th className={this.props.classes.rowItems}>Transfer Out</th>
                                <th className={this.props.classes.rowItems}>Transfer In</th>
                                <th className={this.props.classes.rowItems}>Your Bid</th>
                                <th className={this.props.classes.rowItems}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.transfersHistory.map((player)=> {
                                let transferOutPlayer = getPlayerData(player.transferOutPlayerId);
                                let transferInPlayer = getPlayerData(player.transferInList[0].playerId);
                                return(
                                    <tr>
                                        <td className={this.props.classes.rowItems}>
                                            {transferOutPlayer.playerName}
                                        </td>
                                        <td className={this.props.classes.rowItems}>
                                            {transferInPlayer.playerName}
                                        </td>
                                        <td className={this.props.classes.rowItems}>
                                            {getPrice(player.bidAmount)}
                                        </td>
                                        <td className={this.props.classes.rowItems}>
                                            <CancelPresentationIcon onClick={()=>{this.cancelRequest(player)}} className={this.props.classes.cancelRequest}/>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    </Col>
                </Row>
            )
        }
    }

    cancelBtnClicked = (val)=> {
        if(this.state.transferIn){
            this.props.addUnsold([this.state.transferIn]);
            this.setState({
                transferIn: null
            })
        }
    }

    cancelTransfers = () => {
        let squad = [...this.state.squad, this.state.transferOut];
        this.props.updateFilter(this.state.filter);
        this.setState({
            transferOut: null,
            transferIn: null,
            squad: squad,
            transferInitiated: false
        })
    }

    getTransferTotal = (transfers) => {
        let total = 0;
        if(transfers){
            transfers.map((transfer)=>{
                total = total + transfer.bidAmount;
            })
        }
        return total;
    }

    getSquad = () => {
        let squad = [...this.state.squad];
        if(this.state.transfersHistory){
            this.state.transfersHistory.map((transfer)=> {
                squad = squad.filter((item)=> item.playerId != transfer.transferOutPlayerId)
            })
        }
        return squad;
    }

    getUnsoldSquad = () => {
        let unsold = [...this.state.unsold];
        if(this.state.transfersHistory){
            this.state.transfersHistory.map((transfer) => {
                unsold = unsold.filter((item)=> item.playerId != transfer.transferInList[0].playerId)
            })
        }
        return unsold;
    }

    render(){

        const squad = this.getSquad();
        let transferTotal = this.getTransferTotal(this.state.transfersHistory);
        const balance = getPurseBalance(squad) - transferTotal;
        const unsold = this.getUnsoldSquad();
        
        if(this.props.detail.leagueRole == ROLE_MODERATOR){
            return(
                <Container fluid>
                    <Row>
                        <Typography className={this.props.classes.header} variant="h5"> Transfers </Typography>
                    </Row>
                    <Row>
                        <Typography className={this.props.classes.subHeader} variant="subtitle1"> League Name - {this.props.id} </Typography>   
                    </Row>
                    <Row>
                        <Typography className={this.props.classes.subHeader} variant="subtitle1"> Lock transfers for your league. </Typography>
                    </Row>
                    <Row>
                        <Button variant="info" className={this.props.classes.lockBtn} onClick={()=>{this.props.lockTransfers()}}>Lock <LockIcon className={this.props.classes.lockIcon}/></Button>
                    </Row>
                </Container>
            )
        }else if(this.props.detail.leagueRole == ROLE_PLAYER){
            return(
                <Container fluid>
                    <Row>
                    </Row>
                    <Row>
                        <Col>
                            <Typography className={this.props.classes.subHeader} variant="subtitle1"> League Name - <span className={this.props.classes.titleValue}>{this.props.id} </span></Typography>   
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Typography className={this.props.classes.subHeader} variant="subtitle1"> Team Name - <span className={this.props.classes.titleValue}>{this.props.detail.teamName} </span></Typography>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Typography className={this.props.classes.subHeader} variant="subtitle1"> Purse Remaining - <span className={this.props.classes.titleValue}>{getPrice(balance)} </span></Typography>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Typography className={this.props.classes.subHeader} variant="subtitle1"> <span className={this.props.classes.transfersTitle}> Your Transfer Requests</span></Typography>
                        </Col>
                    </Row>
                    {this.getTransfersHistory()}
                    {this.getTransfersList(balance)}
                    
                    <Row className={this.props.classes.tableData}>
                        <Col md={6} xs={12}>
                            <Typography variant="h6" className={this.props.classes.subHeader}> Your Squad</Typography>
                            <TeamTable unsold={false} value="squad" rows={squad} itemSelect={this.onSquadSelect}/>
                        </Col>
                        <Col md={6} xs={12}>
                            <Row>
                                <Col md={6}>
                                    <Typography variant="h6" className={this.props.classes.subHeader}> Unsold pool</Typography>
                                </Col>
                                <Col md={6} className={this.props.classes.filterArea}>
                                    <Autocomplete
                                        id="grouped-demo"
                                        options={filterOptions}
                                        groupBy={(option) => option.category}
                                        getOptionLabel={(option) => option.title}
                                        style={{ width: 300 }}
                                        renderInput={(params) => <TextField {...params} label="Filter by" variant="standard" />}
                                        className={this.props.classes.unsoldFilter}
                                        onChange={(event, value)=> {this.handleUnsoldFilter(value)}}
                                    />
                                </Col>
                            </Row>
                            <TeamTable unsold={true} value="team" itemSelect={this.unsoldPlayerSelected} rows={unsold} />
                        </Col>
                    </Row>
                    <Dialog
                        open={this.state.error}
                        keepMounted
                        onClose={this.handleErrorClose}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle id="alert-dialog-slide-title">{"Criteria Check!!!"}</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            {this.state.errorMessage}
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={this.handleErrorClose} variant="danger">
                            Okay
                        </Button>
                        </DialogActions>
                    </Dialog>
                </Container>
            )
        }else {
            return(
                <Container fluid>
                    <Row>
                        <Typography className={this.props.classes.header} variant="h5"> Transfers </Typography>
                    </Row>
                    <Row>
                        <Typography className={this.props.classes.subHeader} variant="subtitle1"> League Name - {this.props.id} </Typography>   
                    </Row>
                </Container>
            )
        }
    }
}

export default (withStyles(styles)(Team));