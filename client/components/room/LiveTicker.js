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
        backgroundColor: '#C8D8E6',
        overflowY: 'auto',
        borderRadius: 5
    },

    title: {
        fontWeight: 600,
        marginBottom: 5
    },

    entryItem: {
        display: "block",
        padding: 10,
        marginLeft: 10,
        // marginRight: 20,
        // marginTop: 10,
        // marginBottom:10,
        fontSize: 13
    }
}));
  

let LiveTicker = (props) => {
    const classes = useStyles();

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
    }
  
    useEffect(() => {
      scrollToBottom()
    }, [props]);

    const getBiddingTeam = (userId) => {
        let bidTeam = _.find(props.teams, ['userId', userId]);
        if(bidTeam){
            return bidTeam.teamName;
        }
    }

    const getPrice = (value) => {
        if(value < 100){
            return `${value} lakhs`
        }else if(value >= 100){
    
           let currency = value / 100;
           if(currency == 1){
               return `1 crore`
           }else{
               return `${currency} crores`
           }
        }
    }

    return(
            <>
                <Typography className={classes.title}  variant="subtitle1" align="center">
                    Bid History
                </Typography> 
                <div className={classes.box}>
                    <div ref={messagesEndRef} />
                    {props.bidHistory.map((item)=> {
                        return(
                            <span className={classes.entryItem}> ● {getBiddingTeam(item.userId)} bid {getPrice(item.bid)} </span>
                        )
                    })}
                    
                </div>
            </>
    )
}

export default LiveTicker;