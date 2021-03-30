import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';

const styles = (theme) => ({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '50vh'
  },
  headBG: {
      backgroundColor: '#e0e0e0'
  },
  borderRight500: {
      borderRight: '1px solid #e0e0e0'
  },
  messageArea: {
    height: '44vh',
    overflowY: 'auto'
  },
  textItem: {
      fontSize: 12,
      '& span': {
        fontSize: 14
      },
      '& p': {
        fontSize: 12
      }
  },
  textBoxArea: {
    paddingLeft: 10,
    paddingRight: 15
  },
  textSendBtn: {
    paddingTop: 18
  },
  textContentBox: {

  },
  usersTitle: {
    paddingTop: 5,
    paddingBottom: 5,
    borderRight: "solid 1px #555",
    fontSize: 15,
    '&:hover':{
        cursor: "pointer"
    }
  },
  messagesTitle:{
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 15,
    '&:hover':{
        cursor: "pointer"
    }
  },
  titleBar: {
      backgroundColor: "#C8D8E6"
  },
  subTitle: {
    fontSize: 15
  }
});

const Chatbox = (props) => {

  return (
      <div>
        <Grid container className={props.classes.titleBar}>
            <Grid item xs={6} className={props.classes.usersTitle} >
                <Typography variant="subtitle1" align="center" className={props.classes.subTitle}>Users</Typography>
            </Grid>
            <Grid item xs={6}  className={props.classes.messagesTitle} >
                <Typography variant="subtitle1" align="center" className={props.classes.subTitle}>Messages</Typography>
            </Grid>
        </Grid>
        <Grid container component={Paper} className={props.classes.chatSection}>
            <Grid item xs={12}>
                <List className={props.classes.messageArea}>
                    <ListItem key="1">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText className={props.classes.textItem} align="right" primary="Hey man, What's up ?"></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText className={props.classes.textItem} align="right" secondary="09:30"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem key="2">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="left" primary="Hey, Iam Good! What about you ?"></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="left" secondary="09:31"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem key="3">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="right" primary="Cool. i am good, let's catch up!"></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="right" secondary="10:30"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                </List>
                <Divider />
                <Grid container className={props.classes.textBoxArea}>
                    <Grid item xs={11}>
                        <TextField className={props.classes.textContentBox} id="outlined-basic-email" label="Type Something" fullWidth InputProps={{ disableUnderline: true }}/>
                    </Grid>
                    <Grid xs={1} className={props.classes.textSendBtn} align="right">
                        <SendIcon fontSize="small"/>
                        {/* <Fab color="primary" aria-label="add"></Fab> */}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
      </div>
  );
}

export default withStyles(styles)(Chatbox);