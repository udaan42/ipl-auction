import bcrypt from 'bcrypt';
import HttpStatus from 'http-status-codes';
import User from '../models/user.model';
import { API_ENDPOINT } from '../../client/config/config';
import axios from 'axios';




/**
 * Method to register a new user account
 */
export function register(req, res) {
    axios.post(API_ENDPOINT + '/iplauction/register', {
        userName: req.body.username,
        pwd: req.body.password
    })
        .then((response) => {
            console.log(response.data);
            res.json(response.data);
        }, (error) => {
            console.log('error from api call');
            console.log(error);
            res.status(error.response.status).json(error.response.data);
        });
}