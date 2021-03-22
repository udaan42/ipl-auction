import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
const classNames = require('classnames');
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { autofill } from 'redux-form';

const useStyles = makeStyles((theme) => ({

    box: {
        border: "solid 1px #dedede",
        maxHeight: 465,
        height: "auto",
        backgroundColor: '#faf2ed',
        overflowY: 'auto'
    },

    title: {
        fontWeight: 600,
        marginBottom: 5
    },

    entry: {
        padding: 6,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        marginBottom:10,
        fontSize: 13
    }
}));
  

let LiveTicker = (props) => {
    const classes = useStyles();

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  
    useEffect(() => {
      scrollToBottom()
    }, [props]);

    return(
            <>
                <Typography className={classes.title}  variant="subtitle1" align="center">
                    Bid History
                </Typography> 
                <div className={classes.box}>
                    {props.bidHistory.map((item)=> {
                        return(
                            <Paper className={classes.entry} elevation={1}> Sachin Tendulkar entered auction</Paper>
                        )
                    })}
                    <div ref={messagesEndRef} />
                </div>
            </>
    )
}

export default LiveTicker;