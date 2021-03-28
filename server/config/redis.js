const redis = require('redis');
const { promisify } = require("util");
require('dotenv').config();

const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
});

redisClient.on('connect', () => {
    console.log('Redis client connected');
});

redisClient.on("error", (error) => {
    console.error(error);
});

const get = promisify(redisClient.get).bind(redisClient);
const set = promisify(redisClient.set).bind(redisClient);
const exists = promisify(redisClient.exists).bind(redisClient);


module.exports = {
    get,
    set,
    exists
};