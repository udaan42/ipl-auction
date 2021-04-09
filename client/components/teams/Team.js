import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TeamTable from './TeamTable';
import _ from 'lodash';
import {Button} from 'react-bootstrap';
import Select from 'react-select';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from '@material-ui/lab/Alert';
import { ROLE_PLAYER, ROLE_MODERATOR, TYPE_BATSMAN, TYPE_BOWLER, TYPE_ALL_ROUNDER, TYPE_WICKET_KEEPER, PLAYER_OVERSEAS } from '../../constants/constants';

const styles = {
    header:{
        fontWeight: 500
    },
    subHeader: {
        marginBottom: 15,
        fontSize: 16
    },
    captainSelect: {
        width: 250,
        marginRight: 25,
        marginBottom: 15,
        display: "inline-block"
    },
    submitButton: {
        display: "inline-block",
        marginLeft: 25,
        fontSize: 15
    },
    titleValue: {
        fontWeight: 600,
        marginLeft: 5
    },
    captainLabel: {
        fontSize: 16,
        marginRight: 5
    }
    
};

class Team extends React.Component{

    constructor(props){
        super(props)
        this.state={
            detail: [],
            squad: [],
            team: [],
            wk: 0,
            bat: 0,
            bowl: 0,
            ar: 0,
            overseas: 0,
            error: false,
            errorMessage: "",
            selectedCaptain: null,
            selectedKeeper: null,
            success: false
        }
    }

    
    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.detail != nextProps.detail) {
            if(nextProps.detail.playersSquad){

                let tempSquad =  [...nextProps.detail.playersSquad]
                let playersSquad= _.uniqBy(tempSquad, 'playerName')
                let team = playersSquad.filter((item)=> item.playing);
                let squad = playersSquad.filter((item) => !item.playing);
                
                let wk = team.filter((item)=> item.playerRole == TYPE_WICKET_KEEPER);
                let bat = team.filter((item)=> item.playerRole == TYPE_BATSMAN);
                let bowl = team.filter((item)=> item.playerRole == TYPE_BOWLER);
                let ar = team.filter((item)=> item.playerRole == TYPE_ALL_ROUNDER);
                let overseas = team.filter((item)=> item.playerRace == PLAYER_OVERSEAS);

                let selectedCaptain = null;
                let selectedKeeper = null;
                let captain = team.filter((item)=> item.captain);
                if(captain.length > 0){
                    selectedCaptain = {
                        value: captain[0].playerName,
                        label: captain[0].playerName
                    }
                }
                let keeper = team.filter((item) => item.wicketKeeper);

                if(keeper.length > 0){
                    selectedKeeper = {
                        value: keeper[0].playerName,
                        label: keeper[0].playerName
                    }
                }

                return {
                    detail: nextProps.detail,       
                    team : team,
                    squad : squad,
                    wk: wk.length,
                    bat: bat.length,
                    bowl: bowl.length,
                    ar: ar.length,
                    overseas: overseas.length,
                    selectedCaptain: selectedCaptain,
                    selectedKeeper: selectedKeeper
                };
            }   
        }

        // Return null to indicate no change to state.
        return null;
    }

    wkCheck = (player) => {
        if(player.playerRole == TYPE_WICKET_KEEPER && this.state.wk == 2){
            return true;
        }
        return false;
    }

    batCheck = (player) => {
        if(player.playerRole == TYPE_BATSMAN && this.state.bat == 4){
            return true;
        }
        return false;
    }

    bowlCheck = (player) => {
        if(player.playerRole == TYPE_BOWLER && this.state.bowl == 4){
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
        let tempTeam = [...this.state.team];
        let selectedItem = _.find(tempSquad, ['playerName', item]);
        let selectedPlayerRole = selectedItem.playerRole;
        let selectedPlayerRace = selectedItem.playerRace;
        
        if(tempTeam.length >= 11){
            this.setState({
                error: true,
                errorMessage: "You already have a 11"
            })
        }else if(this.wkCheck(selectedItem)) {
            this.setState({
                error: true,
                errorMessage: "You already have 2 Wicket Keepers in the 11"
            })
        }else if(this.batCheck(selectedItem)) {
            this.setState({
                error: true,
                errorMessage: "You already have 4 Batsmen in the 11"
            })
        }else if(this.bowlCheck(selectedItem)) {
            this.setState({
                error: true,
                errorMessage: "You already have 4 Bowlers in the 11"
            })
        }else if(this.arCheck(selectedItem)) {
            this.setState({
                error: true,
                errorMessage: "You already have 4 All rounders in the 11"
            })
        }else if(this.overseasCheck(selectedItem)) {
            this.setState({
                error: true,
                errorMessage: "You already have 4 foreign players in the 11"
            })
        }else{
            let newSelected = [];
            let count = 0;
            selectedItem.playing = true;
            newSelected = newSelected.concat(tempTeam, selectedItem);
            _.remove(tempSquad,['playerName', item]);
            
            if(selectedPlayerRole == TYPE_WICKET_KEEPER){
                count = this.state.wk + 1;
                if(selectedPlayerRace == PLAYER_OVERSEAS){
                    this.setState({
                        squad: tempSquad,
                        team: newSelected,
                        wk: count,
                        overseas: this.state.overseas + 1
                    })
                }else{
                    this.setState({
                        squad: tempSquad,
                        team: newSelected,
                        wk: count
                    })
                }
            }else if(selectedPlayerRole == TYPE_BATSMAN){
                count = this.state.bat + 1;
                if(selectedPlayerRace == PLAYER_OVERSEAS){
                    this.setState({
                        squad: tempSquad,
                        team: newSelected,
                        bat: count,
                        overseas: this.state.overseas + 1
                    })
                }else{
                    this.setState({
                        squad: tempSquad,
                        team: newSelected,
                        bat: count
                    })
                }
            }else if(selectedPlayerRole == TYPE_BOWLER){
                count = this.state.bowl + 1;
                if(selectedPlayerRace == PLAYER_OVERSEAS){
                    this.setState({
                        squad: tempSquad,
                        team: newSelected,
                        bowl: count,
                        overseas: this.state.overseas + 1
                    })
                }else{
                    this.setState({
                        squad: tempSquad,
                        team: newSelected,
                        bowl: count
                    })
                }
            }else if(selectedPlayerRole == TYPE_ALL_ROUNDER){
                count = this.state.ar + 1;
                if(selectedPlayerRace == PLAYER_OVERSEAS){
                    this.setState({
                        squad: tempSquad,
                        team: newSelected,
                        ar: count,
                        overseas: this.state.overseas + 1
                    })
                }else{
                    this.setState({
                        squad: tempSquad,
                        team: newSelected,
                        ar: count
                    })
                }
            }
        }

        
    }

    onTeamSelect = (item) => {
        
        let tempSquad = [...this.state.squad];
        let tempTeam = [...this.state.team];

        console.log(item);
        let newSelected = [];

        let selectedItem = _.find(tempTeam, ['playerName', item]);
        let selectedPlayerRole = selectedItem.playerRole;
        let selectedPlayerRace = selectedItem.playerRace;

        newSelected = newSelected.concat(tempSquad, selectedItem);
        _.remove(tempTeam,['playerName', item]);
        let count = 0;
        selectedItem.playing = false;

        if(selectedPlayerRole == TYPE_WICKET_KEEPER){
            count = this.state.wk - 1;
            if(selectedPlayerRace == PLAYER_OVERSEAS){
                this.setState({
                    team: tempTeam,
                    squad: newSelected,
                    wk: count,
                    overseas: this.state.overseas - 1
                })
            }else{
                this.setState({
                    team: tempTeam,
                    squad: newSelected,
                    wk: count
                })
            }
        }else if(selectedPlayerRole == TYPE_BATSMAN){
            count = this.state.bat - 1;
            if(selectedPlayerRace == PLAYER_OVERSEAS){
                this.setState({
                    team: tempTeam,
                    squad: newSelected,
                    bat: count,
                    overseas: this.state.overseas - 1
                })
            }else{
                this.setState({
                    team: tempTeam,
                    squad: newSelected,
                    bat: count
                })
            }
        }else if(selectedPlayerRole == TYPE_BOWLER){
            count = this.state.bowl - 1;
            if(selectedPlayerRace == PLAYER_OVERSEAS){
                this.setState({
                    team: tempTeam,
                    squad: newSelected,
                    bowl: count,
                    overseas: this.state.overseas - 1
                })
            }else{
                this.setState({
                    team: tempTeam,
                    squad: newSelected,
                    bowl: count
                })
            }
        }else if(selectedPlayerRole == TYPE_ALL_ROUNDER){
            count = this.state.ar - 1;
            if(selectedPlayerRace == PLAYER_OVERSEAS){
                this.setState({
                    team: tempTeam,
                    squad: newSelected,
                    ar: count,
                    overseas: this.state.overseas - 1
                })
            }else{
                this.setState({
                    team: tempTeam,
                    squad: newSelected,
                    ar: count
                })
            }
        }
    }

    getCaptainOptions = () => {
        let options = [...this.state.team].map((player)=> {
            return {
                value: player.playerName,
                label: player. playerName
            }
        })
        return options
    }

    handleCaptainChange = (selectedCaptain) => {
        this.setState({selectedCaptain})
    }

    handleKeeperChange = (selectedKeeper) => {
        this.setState({selectedKeeper})
    }

    getWicketKeeperSelection = () => {
        let wkOptions = [...this.state.team].filter((item) => item.playerRole == TYPE_WICKET_KEEPER).map((player)=> {
            return {
                value: player.playerName,
                label: player. playerName
            }
        });
        if(wkOptions.length > 1){
            return(
                <>
                <span classes={this.props.classes.captainLabel}> Wicket Keeper - </span>
                <Select
                    className={this.props.classes.captainSelect}
                    value={this.state.selectedKeeper}
                    onChange={this.handleKeeperChange}
                    options={wkOptions}
                    placeholder= "Select a Wicket Keeper"
                />
                </>
            )
        }
    }

    submitButtonClicked = () => {

        let team = [...this.state.team];
        let wk = team.filter((item)=> item.playerRole == TYPE_WICKET_KEEPER).length;
        let bat = team.filter((item)=> item.playerRole == TYPE_BATSMAN).length;
        let bowl = team.filter((item)=> item.playerRole == TYPE_BOWLER).length;
        let ar = team.filter((item)=> item.playerRole == TYPE_ALL_ROUNDER).length;
        let overseas = team.filter((item)=> item.playerRace == PLAYER_OVERSEAS).length;


        if(team.length < 11){
            this.setState({
                error: true,
                errorMessage: "You need to pick a 11"
            })
        }else if(wk < 1){
            this.setState({
                error: true,
                errorMessage: "Wicket Keeper minimum criteria not met! Need at least 1 wicket keeper in the 11"
            })
        }else if(bat < 3){
            this.setState({
                error: true,
                errorMessage: "Batsman minimum criteria not met! Need at least 3 batsmen in the 11"
            })
        }else if(bowl < 3){
            this.setState({
                error: true,
                errorMessage: "Bowler minimum criteria not met! Need at least 3 bowlers in the 11"
            })
        }else if(ar < 1){
            this.setState({
                error: true,
                errorMessage: "All rounder minimum criteria not met! Need at least 1 all rounder in the 11"
            })
        }else if(overseas < 4){
            this.setState({
                error: true,
                errorMessage: "Overseas player criteria not met! Need 4 overseas player in the 11"
            })
        }else if(wk > 1){
            if(!this.state.selectedKeeper){
                this.setState({
                    error: true,
                    errorMessage: "You have more than 1 keeper. Please select your wicket keeper for the 11"
                })
            }
        }else if(!this.state.selectedCaptain){
            this.setState({
                error: true,
                errorMessage: "Please select a captain"
            })
        }

        let captain = _.find(team, ['playerName', this.state.selectedCaptain.value]);
        if(!captain){
            this.setState({
                error: true,
                errorMessage: "Your selected captain is not part of the playing 11"
            })
        }else{
            if(wk > 1 && this.state.selectedKeeper){
                let keeper = _.find(team, ['playerName', this.state.selectedKeeper.value]);
                if(!keeper){
                    this.setState({
                        error: true,
                        errorMessage: "Your selected Keeper is not part of the playing 11"
                    })
                }else{
                    captain.captain = true;

                    team.map((player)=> {
                        if(wk > 1){
                            if(player.playerRole == TYPE_WICKET_KEEPER && player.playerName == this.state.selectedKeeper.value){
                                player.wicketKeeper = true;
                            }else{
                                player.wicketKeeper = false;
                            }
                        }else{
                            if(player.playerRole == TYPE_WICKET_KEEPER){
                                player.wicketKeeper = true;
                            }
                        }
                    })
                    
            
                    team.map((player) => {
                        if(player.playerName == this.state.selectedCaptain.value){
                            player.captain = true;
                        }else{
                            player.captain = false;
                        }
                    })
            
                    let finalSquad = [...team, ...this.state.squad];
                    console.log(finalSquad);
            
                    if(!this.state.error){
                        this.props.updateSquad(finalSquad);
                    }
                }
            }else if(wk == 1){
                captain.captain = true;

                    team.map((player)=> {
                        if(player.playerRole == TYPE_WICKET_KEEPER){
                            player.wicketKeeper = true;
                        }
                    })
            
                    team.map((player) => {
                        if(player.playerName == this.state.selectedCaptain.value){
                            player.captain = true;
                        }else{
                            player.captain = false;
                        }
                    })
            
                    let finalSquad = [...team, ...this.state.squad];
                    console.log(finalSquad);
            
                    if(!this.state.error){
                        this.props.updateSquad(finalSquad);
                    }
            }
            
        }

    }

    handleErrorClose = () => {
        this.setState({
            error: false,
            errorMessage: ""
        })
    }

    goBackBtnClicked = () => {
        this.props.goBack();
    }

    render(){

        const captainOptions = this.getCaptainOptions();

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
                        {/* <Typography className={this.props.classes.header} variant="h5"> My Team </Typography> */}
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
                    <Row className={this.props.classes.captainSelectionArea}>
                        <Col>
                            <span classes={this.props.classes.captainLabel}> Captain - </span>
                            <Select
                                className={this.props.classes.captainSelect}
                                value={this.state.selectedCaptain}
                                onChange={this.handleCaptainChange}
                                options={captainOptions}
                                placeholder= "Select a Captain"
                            />
                            {this.getWicketKeeperSelection()}
                            <Button variant="info" disabled={this.state.team.length != 11} onClick={this.submitButtonClicked} className={this.props.classes.submitButton}> Submit Team</Button>
                            <Button variant="secondary" onClick={this.goBackBtnClicked} className={this.props.classes.submitButton}> Back to Leagues</Button>
                        </Col>
                    </Row>
                    {this.props.success? <Alert onClose={() => {this.props.cancelSuccess()}}>Team submitted successfully</Alert> : ""}
                    <Row className={this.props.classes.tableData}>
                        <Col md={6} xs={12}>
                            <Typography variant="h6" className={this.props.classes.subHeader}> Your Squad</Typography>
                            <TeamTable value="squad" rows={this.state.squad} itemSelect={this.onSquadSelect}/>
                        </Col>
                        <Col md={6} xs={12}>
                            <Typography variant="h6" className={this.props.classes.subHeader}> Your Playing 11</Typography>
                            <TeamTable value="team" rows={this.state.team} itemSelect={this.onTeamSelect}/>
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