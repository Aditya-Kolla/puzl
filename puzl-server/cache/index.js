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
const ahset = promisify(client.hset).bind(client);
const ahgetall = promisify(client.hgetall).bind(client);
const azadd = promisify(client.zadd).bind(client);
const azrange = promisify(client.zrange).bind(client);

module.exports = {
    aget,
    aset,
    ahset,
    ahgetall,
    azadd,
    azrange
}