const app = require('express')();
const http = require('http');
const server = http.createServer(app);
const socketIo = require('socket.io');
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
const PORT = 8080

app.get('/', (req, res) => {
    res.send("<h1>Home Page</h1>")
})

io.on("connection", (socket) => {
    console.log(`New client connected.`);
    setInterval(() => sendRandomQuestion(socket), 2000);
    socket.on("disconnect", () => {
        console.log(`Client disconnected.`);
    })
});

const sendRandomQuestion = (socket) => {
    const a =  Math.floor(Math.random() * Math.floor(42));
    const b = Math.floor(Math.random() * Math.floor(42));
    let res = {
        question: `${a} + ${b} = ?`,
        options: [1, 2, 3, 4]
    };
    socket.emit("TestQuestion", res);
    console.log(`Sent new question: ${res.question}`);
}

server.listen(PORT, () => {
    console.log('puzl-server started on port: ' + PORT);
})