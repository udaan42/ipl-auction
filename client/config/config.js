export const apiPath = 'api/';

export const APP_HOST = process.env.APP_HOST || 'localhost';
export const APP_PORT = process.env.APP_PORT || 3000;
export const HOST = `${APP_HOST}:${APP_PORT}/`;

export const API_URL = `http://${HOST}${apiPath}`;
export const JWT_TOKEN = 'token';
export const USER_ID = 'userId';

export const API_HOST = 'localhost';
export const API_PORT = 8080;
export const API_ENDPOINT = 'http://auction-fantasy-jcrud.us-east-2.elasticbeanstalk.com';
