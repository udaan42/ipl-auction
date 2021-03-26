import React, { useState, useEffect } from 'react';
import Room from '../../components/room/Room';
import _ from 'lodash';
import { useHistory, useParams } from 'react-router-dom';
import { API_ENDPOINT } from '../../config/config';
import  getLeagueDetails  from '../../fetch/LeagueDetails';
import getPlayerBagDetails from '../../fetch/PlayerBags';

const data1 = [{
    "Player": "SR Tendulkar (INDIA)",
    "Span": "1992-2011",
    "Mat": 45,
    "Runs": 2278,
    "HS": 152,
    "BatAv": 56.95,
    "Hundreds": 6,
    "Wkts": 8,
    "BBI": "28-Feb",
    "BowlAv": 67.37,
    "FvWkts": 0,
    "Ct": 12,
    "St": 0,
    "Ave Diff": -10.42,
    "URL": "https://stats.espncricinfo.com/ci/content/player/35320.html",
    "image": "https://www.espncricinfo.com/inline/content/image/501527.html?alt=1",
    "Country": "INDIA",
    "Role": "Batsman",
    "Price": "2 Cr",
    "Bags": "Marquee",
    "type": "Indian",
    "team": "Mumbai Indians",
    "stats": "IPL"
},
{
    "Player": "AB De Villiers",
    "Span": "1992-2011",
    "Mat": 45,
    "Runs": 2278,
    "HS": 152,
    "BatAv": 56.95,
    "Hundreds": 6,
    "Wkts": 8,
    "BBI": "28-Feb",
    "BowlAv": 67.37,
    "FvWkts": 0,
    "Ct": 12,
    "St": 0,
    "Ave Diff": -10.42,
    "URL": "https://stats.espncricinfo.com/ci/content/player/35320.html",
    "image": "https://www.espncricinfo.com/inline/content/image/501527.html?alt=1",
    "Country": "INDIA",
    "Role": "Batsman",
    "Price": "2 Cr",
    "Bags": "Marquee",
    "type": "Indian",
    "team": "Mumbai Indians",
    "stats": "IPL"
},
{
    "Player": "Ricky Ponting",
    "Span": "1992-2011",
    "Mat": 45,
    "Runs": 2278,
    "HS": 152,
    "BatAv": 56.95,
    "Hundreds": 6,
    "Wkts": 8,
    "BBI": "28-Feb",
    "BowlAv": 67.37,
    "FvWkts": 0,
    "Ct": 12,
    "St": 0,
    "Ave Diff": -10.42,
    "URL": "https://stats.espncricinfo.com/ci/content/player/35320.html",
    "image": "https://www.espncricinfo.com/inline/content/image/501527.html?alt=1",
    "Country": "INDIA",
    "Role": "Batsman",
    "Price": "2 Cr",
    "Bags": "Marquee",
    "type": "Indian",
    "team": "Mumbai Indians",
    "stats": "IPL"
},
{
    "Player": "Brian Lara",
    "Span": "1992-2011",
    "Mat": 45,
    "Runs": 2278,
    "HS": 152,
    "BatAv": 56.95,
    "Hundreds": 6,
    "Wkts": 8,
    "BBI": "28-Feb",
    "BowlAv": 67.37,
    "FvWkts": 0,
    "Ct": 12,
    "St": 0,
    "Ave Diff": -10.42,
    "URL": "https://stats.espncricinfo.com/ci/content/player/35320.html",
    "image": "https://www.espncricinfo.com/inline/content/image/501527.html?alt=1",
    "Country": "INDIA",
    "Role": "Batsman",
    "Price": "2 Cr",
    "Bags": "Marquee",
    "type": "Indian",
    "team": "Mumbai Indians",
    "stats": "IPL"
}]

const data2 = [{
    "Player": "Virat Kohli",
    "Span": "1992-2011",
    "Mat": 45,
    "Runs": 2278,
    "HS": 152,
    "BatAv": 56.95,
    "Hundreds": 6,
    "Wkts": 8,
    "BBI": "28-Feb",
    "BowlAv": 67.37,
    "FvWkts": 0,
    "Ct": 12,
    "St": 0,
    "Ave Diff": -10.42,
    "URL": "https://stats.espncricinfo.com/ci/content/player/35320.html",
    "image": "https://www.espncricinfo.com/inline/content/image/501527.html?alt=1",
    "Country": "INDIA",
    "Role": "Batsman",
    "Price": "2 Cr",
    "Bags": "Marquee",
    "type": "Indian",
    "team": "Mumbai Indians",
    "stats": "IPL"
},
{
    "Player": "KUmar Sangakkara",
    "Span": "1992-2011",
    "Mat": 45,
    "Runs": 2278,
    "HS": 152,
    "BatAv": 56.95,
    "Hundreds": 6,
    "Wkts": 8,
    "BBI": "28-Feb",
    "BowlAv": 67.37,
    "FvWkts": 0,
    "Ct": 12,
    "St": 0,
    "Ave Diff": -10.42,
    "URL": "https://stats.espncricinfo.com/ci/content/player/35320.html",
    "image": "https://www.espncricinfo.com/inline/content/image/501527.html?alt=1",
    "Country": "INDIA",
    "Role": "Batsman",
    "Price": "2 Cr",
    "Bags": "Marquee",
    "type": "Indian",
    "team": "Mumbai Indians",
    "stats": "IPL"
},
{
    "Player": "Risabh Pant",
    "Span": "1992-2011",
    "Mat": 45,
    "Runs": 2278,
    "HS": 152,
    "BatAv": 56.95,
    "Hundreds": 6,
    "Wkts": 8,
    "BBI": "28-Feb",
    "BowlAv": 67.37,
    "FvWkts": 0,
    "Ct": 12,
    "St": 0,
    "Ave Diff": -10.42,
    "URL": "https://stats.espncricinfo.com/ci/content/player/35320.html",
    "image": "https://www.espncricinfo.com/inline/content/image/501527.html?alt=1",
    "Country": "INDIA",
    "Role": "Batsman",
    "Price": "2 Cr",
    "Bags": "Marquee",
    "type": "Indian",
    "team": "Mumbai Indians",
    "stats": "IPL"
},
{
    "Player": "Steve Smith",
    "Span": "1992-2011",
    "Mat": 45,
    "Runs": 2278,
    "HS": 152,
    "BatAv": 56.95,
    "Hundreds": 6,
    "Wkts": 8,
    "BBI": "28-Feb",
    "BowlAv": 67.37,
    "FvWkts": 0,
    "Ct": 12,
    "St": 0,
    "Ave Diff": -10.42,
    "URL": "https://stats.espncricinfo.com/ci/content/player/35320.html",
    "image": "https://www.espncricinfo.com/inline/content/image/501527.html?alt=1",
    "Country": "INDIA",
    "Role": "Batsman",
    "Price": "2 Cr",
    "Bags": "Marquee",
    "type": "Indian",
    "team": "Mumbai Indians",
    "stats": "IPL"
}]

const bagNumbers = [1,2,3,4,5,6,7,8,9,10];


const RoomsContainer = (props) => {

    const [refresh, setRefresh] = useState(false);
    const [index, setIndex] = useState(0);


    const { id } = useParams();
    const url = `${API_ENDPOINT}iplauction/league/${id}`;
    const { data, reload } = getLeagueDetails(url, refresh);

    const playerBagsURL =  `${API_ENDPOINT}iplauction/player/getPlayersBag`;
    const { players, bagNumber } = getPlayerBagDetails(playerBagsURL, bagNumbers[index]);
    
    const getNextBag = () => {
        setIndex(index + 1);
    }

    const sellPlayer = (data) => {
        setRefresh(!refresh);
        // const url = `${API_ENDPOINT}iplauction/league/sellPlayerToUser/${data.playerId}/${data.sellPrice}`;

        // const headers = {
        //     'X-UserId': data.userId,
        //     'X-LeagueId': data.leagueId
        // }
        // // POST CALL
        // axios.post(url, {}, {
        //     headers: headers
        // })
        // .then((response) => {
        //     setRefresh(true);
        // })
        // .catch((error) => {
        //     console.log(error);
        // });
    }

    let currentBag = _.shuffle(players);
    return(
        <>
            <Room sellPlayer={sellPlayer} playerSet={players} detail={data} bag={bagNumber} getNextBag={getNextBag} />
        </>
    )

}

export default RoomsContainer;