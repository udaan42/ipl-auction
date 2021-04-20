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
    filterArea: {

    },
    unsoldFilter: {
        marginBottom: 10,
        marginTop: -25,
        float: "right"
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
            transferPopUp: false,
            transferOut: []
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
            this.setState({
                transfers: data
            })
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

    wkCheck = (player) => {
        if(player.playerRole == TYPE_WICKET_KEEPER && this.state.wk == 2){
            return true;
        }else if(player.playerRole == TYPE_WICKET_KEEPER && this.state.bat == 5 && this.state.wk == 1){
            return true;
        }
        return false;
    }

    batCheck = (player) => {
        if(player.playerRole == TYPE_BATSMAN && this.state.bat == 5){
            return true;
        }else if(player.playerRole == TYPE_BATSMAN && this.state.bat == 4 && this.state.wk == 2){
            return true;
        }
        return false;
    }

    bowlCheck = (player) => {
        if(player.playerRole == TYPE_BOWLER && this.state.bowl == 5){
            return true;
        }
        return false;
    }

    arCheck = (player) => {
        if(player.playerRole == TYPE_ALL_ROUNDER && this.state.ar == 4){
            return true;
        }
        return false;
    }

    overseasCheck = (player) => {
        if(player.playerRace == PLAYER_OVERSEAS && this.state.overseas == 4){
            return true;
        }
        return false;
    }

    onSquadSelect = (item) => {
        let tempSquad = [...this.state.squad];
        let selectedItem = _.find(tempSquad, ['playerName', item]);
        let selectedPlayerRole = selectedItem.playerRole;
        let selectedPlayerRace = selectedItem.playerRace;
        
        let transferOut = [...this.state.transferOut];
        transferOut.push(selectedItem);
        _.remove(tempSquad,['playerName', item]);

        this.setState({
            squad: tempSquad,
            transferOut: transferOut
        })        
    }

    unsoldPlayerSelected = (item) => {
        let unsold = [...this.state.unsold];
        let selectedItem = _.find(unsold, ['playerName', item]);
        let selectedPlayerRole = selectedItem.playerRole;
        let selectedPlayerRace = selectedItem.playerRace;

        if(this.state.squad.length >= 15){
            this.setState({
                error: true,
                errorMessage: "You need to transfer out a player first"
            })
        }else{
            this.setState({
                selectedPlayer: selectedItem,
                transferPopUp: true
            })
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
                            {this.getTransferNews()}
                        </Col>
                    </Row>
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