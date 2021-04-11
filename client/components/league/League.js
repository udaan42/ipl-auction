import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Button, Container, Table, Col } from 'react-bootstrap';
import CreateLeagueModal from './CreateLeagueModal';
import JoinLeagueModal from './JoinLeagueModal';
import { withStyles } from '@material-ui/core/styles';
import LeagueItem from './LeagueItem';
import { Link } from 'react-router-dom';

const styles = {
    headerBlock:{
        marginBottom: 15
    },
    subTitle:{
        marginTop: 25
    },
    subTitleText:{
        fontWeight: 500
    },
    rowItems: {
        paddingTop: 10,
        paddingBottom: 10
    },
    leagueTableContainer:{
        marginTop: 25,
        fontSize: 16
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

    render(){
        return(
                <Box>
                    {/* {this.props.list.length == 0? <Grid className={this.props.classes.headerBlock} container-fluid spacing={2}>
                        <Grid item xs>
                            <Typography>
                                You are not part of any league. Please create a new league or join an existing league
                            </Typography>
                        </Grid>
                    </Grid>: ""} */}

                    <Grid container spacing={2}>
                        <Grid item xs="3">
                            <Button variant="primary" color="primary" onClick={this.onCreateFormOpen}>
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
                    <Container fluid>
                        <Col className={this.props.classes.leagueTableContainer} md={8}>
                            <Table striped hover size="md" className={this.props.classes.yourTable} >
                                <thead>
                                    <tr>
                                    <th className={this.props.classes.rowItems}>#</th>
                                    <th className={this.props.classes.rowItems}>Name</th>
                                    <th className={this.props.classes.rowItems}>Position</th>
                                    <th className={this.props.classes.rowItems}>Points</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.list.map((item)=>{
                                        const url = `/leagues/${item.leagueId}`;
                                        return(
                                            <tr>
                                                <td className={this.props.classes.rowItems}>
                                                    #
                                                </td>
                                                <td className={this.props.classes.rowItems}>
                                                    <Link to={url}>
                                                        {item.leagueName}
                                                    </Link>
                                                </td>
                                                <td className={this.props.classes.rowItems}>
                                                    -
                                                </td>
                                                <td className={this.props.classes.rowItems}>
                                                    {item.points}
                                                </td>

                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>

                        </Col>
                        
                    </Container>

                    {/* <Grid container spacing={1}>
                        {this.props.list.map((item)=>{
                            return (
                                <Grid item md="4" xs="4">
                                    <LeagueItem item={item} />
                                </Grid>
                            )    
                        })}
                    </Grid> */}
                    
                </Box>
                
        )
    }
}

export default (withStyles(styles)(League));