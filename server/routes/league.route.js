import express from 'express';

const router = express.Router();
import { API_ENDPOINT } from '../../client/config/config';
import axios from 'axios';

router.route('/').get((req, res) => {

    let header = JSON.parse(JSON.stringify(req.headers));
    const url = `${API_ENDPOINT}/iplauction/league/getUserLeagues`;
    console.log(header);

    const headers = {
        withCredentials: true,
        credentials: 'include',
        headers: {
            'Authorization': header.authorisation,
            'X-UserId': header.userid
        }
    }
    console.log("------>Headers", headers)
    axios.get(url, headers)
        .then((response) => {
            console.log(response.data);
            res.json(response.data);
        }, (error) => {
            console.log('error from api call');
            console.log(error);
        });

})

export default router;