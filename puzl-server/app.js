const app = require('express')();
const http = require('http').createServer(app)

const PORT = 8080

app.get('/', (req, res) => {
    res.send("<h1>Home Page</h1>")
})

http.listen(PORT, () => {
    console.log('puzl-server started on port: ' + PORT);
})