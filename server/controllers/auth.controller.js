import { API_ENDPOINT } from '../../client/config/config';
import axios from 'axios';
/**
 * Returns jwt token if valid email and password is provided
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function login(req, res) {
    axios.post(API_ENDPOINT + '/iplauction/authenticate', {
        username: req.body.username,
        password: req.body.password
    })
        .then((response) => {
            console.log(response.data);
            res.json(response.data);
        }, (error) => {
            console.log('error from api call');
            console.log(error.response.status);
            console.log(error.response.data);
            res.status(error.response.status).json(error.response.data);
        });
}