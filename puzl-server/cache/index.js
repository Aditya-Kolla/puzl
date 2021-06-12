const { promisify } = require('util');
const redis = require('redis');
const client = redis.createClient({
    host: 'redis'
});

client.on('error', (err) => {
    console.error(err);
});

//  Promisifying the required redis lib functions as there is no direct support
const aget = promisify(client.get).bind(client);
const aset = promisify(client.set).bind(client);
const azadd = promisify(client.zadd).bind(client);

module.exports = {
    aget,
    aset,
    azadd
}