const express = require('express');
const app = express();
const http = require('http').createServer(app)
const io = require('socket.io')(http);
const cors = require('cors');

const createListeners = require('./listeners');
const routes = require('./routes');

app.use(cors());
createListeners(io);
// support parsing of application/json type post data
app.use(express.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(express.urlencoded({ extended: true }));

const PORT = 8080;

app.use('/api', routes)

http.listen(PORT, () => {
    console.log('puzl-server started on port: ' + PORT);
})