import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TeamItem from './TeamItem';

import { withStyles } from '@material-ui/core/styles';


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
  

class MyTeams extends React.Component{

    constructor(props) {
        super(props);
        
    }

    getCompletedLeagues = () => {
        return this.props.list.filter(item => item.isActive);
    }


    render(){

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

                    <Grid container spacing={1}>
                        {leagues.map((item)=>{
                            return (
                                <Grid item md="4" xs="4">
                                    <TeamItem item={item} />
                                </Grid>
                            )      
                        })}
                    </Grid>
                    
                </Box>
                
        )
    }
}

export default (withStyles(styles)(MyTeams));