import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TeamTable from './TeamTable';
import _ from 'lodash';
import {Button} from 'react-bootstrap';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ROLE_PLAYER, ROLE_MODERATOR, TYPE_BATSMAN, TYPE_BOWLER, TYPE_ALL_ROUNDER, TYPE_WICKET_KEEPER, PLAYER_OVERSEAS, filterOptions } from '../../constants/constants';
import { getPurseBalance, getPrice } from '../../utils/priceUtil';
import {
    joinAuctionRoom,
    onJoinRoom,
    joinTransfersRoom,
    onJoinTransfers,
    submitTransferBid,
    getTransferBidUpdates
} from '../../socket/socket';

import { USER_ID } from '../../config/config';
import { clearLocalStorage, getLocalStorage, setLocalStorage } from '../../utils/storageUtil';
import TransferPopUpModal from './TransferPopUpModal';
import CancelIcon from '@material-ui/icons/Cancel';

const styles = {
    header:{
        fontWeight: 500
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
    }
    
};

class Team extends React.Component{

    constructor(props){
        super(props)
        this.state={
            detail: [],
            squad: [],
            unsold: [],
            wk: 0,
            bat: 0,
            bowl: 0,
            ar: 0,
            overseas: 0,
            error: false,
            errorMessage: "",
            selectedPlayer: null,
            success: false,
            transfers: [],
            transfersHistory: [],
            transferPopUp: false,
            transferOut: null,
            transferIn1: null,
            transferIn2: null,
            transferIn3: null,
            bid: 0,
            number: 1,
            transferInitiated: false,
            filter: ""
        }
    }

    componentDidMount(){
        this.enterTransfersRoom();

        onJoinRoom((err, data) => {
            if (this.props.leagueId) {
                const val = {
                    userId: getLocalStorage(USER_ID),
                    roomId: this.props.leagueId,
                };
                joinTransfersRoom(val);
            }
        });

        onJoinTransfers((err, data) => {
            console.log(data);
            // this.setState({
            //     transfers: data
            // })
        });

        getTransferBidUpdates((err, data) => {
            console.log(data)
        });

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

        // Return null to indicate no change to state.
        return null;
    }

    enterTransfersRoom = () => {
        if (this.props.leagueId) {
            const data = {
                userId: getLocalStorage(USER_ID),
                roomId: this.props.leagueId,
            };
            joinAuctionRoom(data)
        }
    }

    wkCheck = (playerRole, wk) => {
        if(playerRole == TYPE_WICKET_KEEPER && (wk < 2 || wk ==3)){
            return false;
        }
        return true;
    }

    batCheck = (playerRole, bat) => {
        if(playerRole == TYPE_BATSMAN && (bat < 3 || bat == 5)){
            return false;
        }
        return true;
    }

    bowlCheck = (playerRole, bowl ) => {
        if(playerRole == TYPE_BOWLER && (bat < 3 || bowl == 5)){
            return false;
        }
        return true;
    }

    arCheck = (playerRole, ar) => {
        if(playerRole == TYPE_ALL_ROUNDER && (ar < 3 || ar == 5)){
            return false;
        }
        return true;
    }

    overseasCheck = (playerRace, overseas) => {
        if(playerRace == PLAYER_OVERSEAS && (overseas < 5 || overseas == 6)){
            return false;
        }
        return true;
    }

    criteriaCheck = (player) => {
        let team = [...this.state.squad, player];
        let wk = team.filter((item)=> item.playerRole == TYPE_WICKET_KEEPER).length;
        let bat = team.filter((item)=> item.playerRole == TYPE_BATSMAN).length;
        let bowl = team.filter((item)=> item.playerRole == TYPE_BOWLER).length;
        let ar = team.filter((item)=> item.playerRole == TYPE_ALL_ROUNDER).length;
        let overseas = team.filter((item)=> item.playerRace == PLAYER_OVERSEAS).length;

        if( wk < 2 || wk > 3 ){
            this.setState({
                error: true,
                errorMessage: "You dont meet the Wicket Keeper criteria"
            })
            
        }else if( bat < 3 || bat > 5){
            this.setState({
                error: true,
                errorMessage: "You dont meet the Batsmen criteria"
            })

        }else if( bowl < 3 || bowl > 5){
            this.setState({
                error: true,
                errorMessage: "You dont meet the Bowler criteria"
            })
            
        }else if( ar < 3 || ar > 5){
            this.setState({
                error: true,
                errorMessage: "You dont meet the All Rounder criteria"
            })
        }else if( overseas < 5 || overseas > 6){
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
        let tempSquad = [...this.state.squad];
        let selectedItem = _.find(tempSquad, ['playerName', item]);
        let selectedPlayerRole = selectedItem.playerRole;
        let selectedPlayerRace = selectedItem.playerRace;
        
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

    unsoldPlayerSelected = (item) => {
        let unsold = [...this.state.unsold];
        let selectedItem = _.find(unsold, ['playerName', item]);
        let selectedPlayerRole = selectedItem.playerRole;
        let selectedPlayerRace = selectedItem.playerRace;

        _.remove(unsold,['playerName', item]);

        if(this.state.squad.length >= 15 || !this.state.transferInitiated){
            this.setState({
                error: true,
                errorMessage: "You need to transfer out a player first"
            })
        }else{
            if(this.criteriaCheck(selectedItem)){
                if(this.state.number == 1){
                    this.props.updateUnsold(item);
                    this.setState({
                        transferIn1: selectedItem,
                        // transferPopUp: true,
                        // unsold: unsold,
                        number : this.state.number + 1
                    })
                }else if(this.state.number == 2){
                    this.props.updateUnsold(item);
                    this.setState({
                        transferIn2: selectedItem,
                        // transferPopUp: true,
                        // unsold: unsold,
                        number : this.state.number + 1
                    })
    
                }else if(this.state.number == 3){
                    this.props.updateUnsold(item);
                    this.setState({
                        transferIn3: selectedItem,
                        // transferPopUp: true,
                        // unsold: unsold,
                        number : this.state.number + 1
                    })
                } 
            }
        }
        
    }

    closePopUp = () => {
        this.setState({
            selectedPlayer: null,
            transferPopUp: false
        })
    }

    submitBit = (bid) => {
        console.log(bid);
        
        const data = {
            userId: getLocalStorage(USER_ID),
            roomId: this.props.leagueId,
            playerId: this.state.selectedPlayer.playerId,
            nextBid: bid
        };

        submitTransferBid(data);
    
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

    getTransferNews = () => {
        if(this.state.transfers){
            console.log(this.state.transfers)
            return this.state.transfers.map((item, index)=>{
                return(
                    <div key={index}>{item.playerId}</div>
                )
        })}
    }

    handleChange = (e) => {
        this.setState({
            bid: e.target.value
        })
    }

    submitTransfers = () => {
        let data = {};
        data.transferOut = this.state.transferOut;
        data.transferIn = [];
        if(this.state.transferIn1){
            data.transferIn.push(this.state.transferIn1)
        }else{
            this.setState({
                error: true,
                errorMessage: "You need to select atleast 1 player as replacement"
            })
            return;
        }
        if(this.state.transferIn2){
            data.transferIn.push(this.state.transferIn2)
        }
        if(this.state.transferIn3){
            data.transferIn.push(this.state.transferIn3)
        }
        if(parseInt(this.state.bid) <= 0){
            this.setState({
                error: true,
                errorMessage: "You need to specify the bidding amount"
            })
            return;
        }
        data.bidPrice = parseInt(this.state.bid);
        data.transferOutPrice = this.state.transferOut.soldPrice;
        console.log(data);
        let history = [...this.state.transfersHistory, data];
        this.setState({
            transfersHistory: history,
            transfers: [],
            transferOut: null,
            transferIn1: null,
            transferIn2: null,
            transferIn3: null,
            number: 1,
            transferInitiated: false
        })
    }

    getMinimumPrice = () => {
        let minimum = 0;
        if(this.state.transferIn1){
            minimum = Math.max(minimum, this.state.transferIn1.basePrice); 
        }
        if(this.state.transferIn2){
            minimum = Math.max(minimum, this.state.transferIn2.basePrice); 
        }
        if(this.state.transferIn3){
            minimum = Math.max(minimum, this.state.transferIn3.basePrice); 
        }
        return minimum;
    }

    getTransfersList = () => {
        let min = this.getMinimumPrice();
        return this.state.transfers.map((player)=> {
            return(
                <Row className={this.props.classes.transferContent}>
                    <Col md={2}>
                        <span className={this.props.classes.transferLabel}>Transfer Out - </span>
                        <ol className={this.props.classes.list}>
                            <span className={this.props.classes.transferPlayer}>{player.playerName}</span>    
                        </ol> 
                    </Col>
                    <Col md={2}>
                        <span className={this.props.classes.transferLabel}>Transfer In - </span>
                        <ol className={this.props.classes.list}>
                            {this.state.transferIn1 ? <li className={this.props.classes.listItem}>
                                        {this.state.transferIn1.playerName}
                                        <CancelIcon className={this.props.classes.cancelIcon} onClick={()=>{this.cancelBtnClicked(this.state.transferIn1.playerName)}} />
                                    </li>: ""}
                            {this.state.transferIn2 ? <li className={this.props.classes.listItem}>
                                        {this.state.transferIn2.playerName}
                                        <CancelIcon className={this.props.classes.cancelIcon} onClick={()=>{this.cancelBtnClicked(this.state.transferIn2.playerName)}} />
                                    </li>: ""}
                            {this.state.transferIn3 ? <li className={this.props.classes.listItem}>
                                        {this.state.transferIn3.playerName}
                                        <CancelIcon className={this.props.classes.cancelIcon} onClick={()=>{this.cancelBtnClicked(this.state.transferIn3.playerName)}} />
                                    </li>: ""}
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
                                    max: getPurseBalance(this.state.squad),
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
        })
    }

    getTransfersHistory = () => {
        return this.state.transfersHistory.map((player)=> {
            return(
                <Row className={this.props.classes.transferContent}>
                    <Col md={2}>
                        <span className={this.props.classes.transferLabel}>Transfer Out - </span>
                        <ol className={this.props.classes.list}>
                            <span className={this.props.classes.transferPlayer}>{player.transferOut.playerName}</span>    
                        </ol>
                    </Col>
                    <Col md={3}>
                        <span className={this.props.classes.transferLabel}>Transfer In - </span>
                        <ol className={this.props.classes.list}>
                            {player.transferIn.map((item, index) => {
                                return(<li className={this.props.classes.listItem}>
                                    {item.playerName}
                                </li>)
                            })}
                        </ol>
                        
                    </Col>
                    
                    <Col md={2}>
                        <span className={this.props.classes.transferLabel}>Your Bid - </span>
                        <span className={this.props.classes.bidLabel}>{getPrice(player.bidPrice)}</span>
                    </Col>
                    <Col md={2}>
                        <Button>Cancel Request</Button>
                    </Col>
                </Row>
            )
        })
    }

    cancelBtnClicked = (val)=> {
        if(this.state.transferIn1){
            if(this.state.transferIn1.playerName == val){
                this.props.addUnsold([this.state.transferIn1]);
                this.setState({
                    transferIn1: this.state.transferIn2,
                    transferIn2: this.state.transferIn3,
                    transferIn3: null,
                    number : this.state.number - 1
                })
            }
        }
        if(this.state.transferIn2){
            if(this.state.transferIn2.playerName == val){
                this.props.addUnsold([this.state.transferIn2]);
                this.setState({
                    transferIn2: this.state.transferIn3,
                    number : this.state.number - 1,
                    transferIn3: null
                })
            }
        }
        if(this.state.transferIn3){
            if(this.state.transferIn3.playerName == val){
                this.props.addUnsold([this.state.transferIn3]);
                this.setState({
                    transferIn3: null,
                    number : this.state.number - 1
                })
            }
        }
    }

    cancelTransfers = () => {
        let squad = [...this.state.squad, this.state.transferOut];
        this.props.updateFilter(this.state.filter);
        this.setState({
            transfers: [],
            transferIn1: null,
            transferIn2: null,
            transferIn3: null,
            number: 1,
            squad: squad
        })
    }

    render(){

        const balance = getPurseBalance(this.state.squad);

        if(this.props.detail.leagueRole == ROLE_MODERATOR){
            return(
                <Container fluid>
                    <Row>
                        <Typography className={this.props.classes.header} variant="h5"> My Team </Typography>
                    </Row>
                    <Row>
                        <Typography className={this.props.classes.subHeader} variant="subtitle1"> League Name - {this.props.id} </Typography>   
                    </Row>
                    <Row>
                        <Typography className={this.props.classes.subHeader} variant="subtitle1"> You are a moderator for this league. No team selection available </Typography>
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
                    {this.getTransfersList()}
                    
                    <Row className={this.props.classes.tableData}>
                        <Col md={6} xs={12}>
                            <Typography variant="h6" className={this.props.classes.subHeader}> Your Squad</Typography>
                            <TeamTable unsold={false} value="squad" rows={this.state.squad} itemSelect={this.onSquadSelect}/>
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
                            <TeamTable unsold={true} value="team" itemSelect={this.unsoldPlayerSelected} rows={this.state.unsold} />
                        </Col>
                    </Row>
                    <TransferPopUpModal player={this.state.selectedPlayer} balance={balance} submitBid={this.submitBit} show={this.state.transferPopUp} closeModal={this.closePopUp}/>
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
                        <Typography className={this.props.classes.header} variant="h5"> My Team </Typography>
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