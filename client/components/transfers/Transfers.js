import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TeamItem from './TeamItem';
import { LEAGUE_STATUS_ENDED } from '../../constants/constants';
import { withStyles } from '@material-ui/core/styles';
import { USER_ID } from '../../config/config';
import { Link } from 'react-router-dom';
import { getLocalStorage } from '../../utils/storageUtil';
import _ from 'lodash';
import { Button, Container, Table, Col } from 'react-bootstrap';

const styles = {
    headerBlock:{
        marginBottom: 15
    },
    subTitle:{
        // marginTop: 25
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
  

class Transfers extends React.Component{

    constructor(props) {
        super(props);
        
    }

    getCompletedLeagues = () => {
        return this.props.list.filter(item => item.leagueStatus == LEAGUE_STATUS_ENDED);
    }

    render(){
        let userId = getLocalStorage(USER_ID);
        const leagues = this.getCompletedLeagues();
        return(
                <Box>
                    {(leagues.length == 0)? <Grid className={this.props.classes.headerBlock} container-fluid spacing={2}>
                        <Grid item xs>
                            <Typography>
                                You haven't completed any auction yet. Your teams based on the leagues would appear once you finish picking a squad through auction.
                            </Typography>
                        </Grid>
                    </Grid>: ""}
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
                                    <th className={this.props.classes.rowItems}>Points</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leagues.map((item)=>{
                                        const url = `/transfers/${item.leagueId}`;
                                        const player = _.find(item.leagueUsers, ['userId',userId]);
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
                                                    {player.points}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </Col>
                    </Container>                    
                </Box>
                
        )
    }
}

export default (withStyles(styles)(Transfers));