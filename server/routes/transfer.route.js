import express from 'express';

const router = express.Router();
import { API_ENDPOINT } from '../../client/config/config';
import { processTransfers } from '../utils/transferUtil';
import axios from 'axios';

router.route('/:id').get((req, res) => {

    let leagueId = req.params.id;
    let header = JSON.parse(JSON.stringify(req.headers));
    const transferurl = `${API_ENDPOINT}/iplauction/league/getAllTransferRequest/${leagueId}`;
    const leagueurl = `${API_ENDPOINT}/iplauction/league/${leagueId}`;
    const playersurl = `${API_ENDPOINT}/iplauction/player/all`;

    const headers = {
        withCredentials: true,
        credentials: 'include',
        headers: {
            'Authorization': header.authorisation
        }
    }
    let output = [];
    Promise.all([
        axios.get(leagueurl, headers),
        axios.get(transferurl, headers),
        axios.get(playersurl, headers)
    ]).then((responses) => {
        responses.map((response)=>{
            output.push(response.data)
        })

        let result = processTransfers(output[1].payload.transferRequests, output[0].payload.leagueInfo, output[2].payload.playerInfos);

        res.json(result)
    }, (error) => {
        console.log('error from api call');
        console.log(error);
    });
    
})



router.route('/:id').post((req, res) => {
    console.log(req.body);
    console.log('Store room creation details');
    res.sendStatus(201);
});
export default router;