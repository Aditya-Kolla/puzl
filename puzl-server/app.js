const app = require('express')();
const bodyParser = require('body-parser');
const http = require('http');
const server = http.createServer(app);
const mongoose = require('mongoose');

const questionSet = require('./routes/questionSet')


const PORT = 8080

mongoose.connect('mongodb://localhost:27017', {useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.json());

app.use("/questionSet", questionSet);

app.get('/', (req, res) => {
    res.send("<h1>Home Page</h1>")
})

server.listen(PORT, () => {
    console.log('puzl-server started on port: ' + PORT);
})