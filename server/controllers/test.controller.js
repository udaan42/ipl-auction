const fetch = require('node-fetch');
import jcrud from '../config/jcrud';
import HttpStatus from 'http-status-codes';

/**
 *  Find user by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function sayHelloRequest(req, resp) {
    fetch(jcrud.jcrudServiceURL.concat("/greeting"))
    .then(res => res.json())
    .then(json => resp.status(HttpStatus.OK).json(json))
    ;
}
