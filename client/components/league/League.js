import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
// import { Button } from '@material-ui/core';
import { Button } from 'react-bootstrap';
import CreateLeagueModal from './CreateLeagueModal';
import JoinLeagueModal from './JoinLeagueModal';
import { withStyles } from '@material-ui/core/styles';
import LeagueItem from './LeagueItem';

import { API_URL, API_ENDPOINT, USER_ID, JWT_TOKEN, BAG } from '../../config/config';
import { getLocalStorage, setLocalStorage, clearLocalStorage } from '../../utils/storageUtil';

const styles = {
    headerBlock:{
        marginBottom: 15
    },
    subTitle:{
        marginTop: 25
    },
    subTitleText:{
        fontWeight: 500
    }
};
  

class League extends React.Component{

    constructor(props) {
        super(props);
        
    }

    state = {
        showCreateLeagueForm: false,
        showJoinLeagueForm: false,
        userLeague: false,
        form: 1
    }

    onCreateFormOpen = () => {
        this.setState({
            showCreateLeagueForm: true
        })
    }

    onCreateFormClose = () => {
        this.setState({
            form: 1,
            showCreateLeagueForm: false
        })
    }

    onJoinFormOpen = () => {
        this.setState({
            showJoinLeagueForm: true
        })
    }

    onJoinFormClose = () => {
        this.setState({
            showJoinLeagueForm: false,
            form: 1
        })
    }

    changeType = () => {
        this.setState({
            showJoinLeagueForm: !this.state.showJoinLeagueForm,
            showCreateLeagueForm: !this.state.showCreateLeagueForm
        })
    }

    onNextForm = () => {
        if(this.state.form < 3) {
            this.setState({
                form: this.state.form + 1
            })
        }
    }

    getAdminRole = () => {
        let userId = getLocalStorage(USER_ID);
        if(userId == "72346570-bbda-49d5-9b32-ff2c4f550f5c"){
            return true;
        }else if(userId == "9f664500-8700-454b-8b1a-ff3214690885"){
            return true;
        }else if(userId == "6567cf2e-122d-476f-b50d-260fbe3b4b69"){
            return true;
        }
        return false;
    }
    render(){
        const adminAccess = this.getAdminRole();
        return(
                <Box>
                    {this.props.leagues.list == 0? <Grid className={this.props.classes.headerBlock} container-fluid spacing={2}>
                        <Grid item xs>
                            <Typography>
                                You are not part of any league. Please create a new league or join an existing league
                            </Typography>
                        </Grid>
                    </Grid>: ""}

                    <Grid container spacing={2}>
                        <Grid item xs="3">
                            <Button disabled={!adminAccess} variant="primary" color="primary" onClick={this.onCreateFormOpen}>
                                Create a New League
                            </Button>
                            <CreateLeagueModal form={this.state.form} onNext={this.onNextForm} show={this.state.showCreateLeagueForm} onExit={this.onCreateFormClose} onChangeFormType={this.changeType}/>
                        </Grid>
                        <Grid item xs="3">
                            <Button variant="outline-secondary" color="primary" onClick={this.onJoinFormOpen}>
                                Join an existing League
                            </Button>
                            <JoinLeagueModal form={this.state.form} onNext={this.onNextForm} show={this.state.showJoinLeagueForm} onExit={this.onJoinFormClose} onChangeFormType={this.changeType}/>
                        </Grid>
                    </Grid>

                    <Grid className={this.props.classes.subTitle} container spacing={1}>
                        <Grid item xs>
                            <Typography variant="h5" className={this.props.classes.subTitleText}>
                                Your Leagues
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={1}>
                        {this.props.list.map((item)=>{
                            return (
                                <Grid item md="4" xs="4">
                                    <LeagueItem item={item} />
                                </Grid>
                            )    
                        })}
                    </Grid>
                    
                </Box>
                
        )
    }
}

export default (withStyles(styles)(League));