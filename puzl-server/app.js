const app = require('express')();
const cors = require('cors')
const bodyParser = require('body-parser');
const http = require('http');
const server = http.createServer(app);
const mongoose = require('mongoose');
const socketIo = require('socket.io');
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
const questionSet = require('./routes/questionSet')


const PORT = 8080

mongoose.connect('mongodb://mongo:27017', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(bodyParser.json());

app.use("/questionSet", questionSet);

// Incoming spaghetti
// Temporary. Will replace once question set is user created
const questionList = []
let currentQuestionIndex = 0
const totalQuestions = 100
const timePerQuestion = 10000 // 10 seconds
let interval
app.get('/', (req, res) => {
    res.send("<h1>Home Page</h1>")
})

io.on("connection", (socket) => {
    console.log(`New client connected.`);
    if (interval) {
        clearInterval(interval)
    }
    interval = setInterval(() => sendcurrentQuestion(socket), timePerQuestion);

    socket.on('QuestionResponse', (response) => {
        console.log('User selected option: ', response)
        handleUserResponse(response, socket)
    })

    socket.on("disconnect", () => {
        clearInterval(interval)
        console.log(`Client disconnected.`);
    })
});

const handleUserResponse = (response, socket) => {
    const currentQuestion = questionList[currentQuestionIndex]
    if (response.number === currentQuestion.number) {
        const result = response.answer == currentQuestion.answer ? 'Correct' : 'Incorrect'
        socket.emit('Result', result)
    }
}

const createRandomQuestionList = (questionSetSize) => {
    for (let i = 0; i < questionSetSize; i++) {
        questionList.push(createRandomQuestion(i))
    }
}

const createRandomQuestion = (questionNumber) => {
    const a = Math.floor(Math.random() * Math.floor(42));
    const b = Math.floor(Math.random() * Math.floor(42));
    let question = {
        number: questionNumber,
        question: `${a} + ${b} = ? `,
        options: {
            1: a - b,
            2: b - a,
            3: a + b,
            4: a * b
        },
        answer: 3
    };
    return question
}

const setcurrentQuestionIndex = () => {
    currentQuestionIndex = Math.floor(Math.random() * Math.floor(totalQuestions))
}

const sendcurrentQuestion = (socket) => {
    let question = questionList[currentQuestionIndex]
    socket.emit("TestQuestion", question);
    console.log(`Sent new question: ${question.question}`);

}
setInterval(() => setcurrentQuestionIndex(), timePerQuestion);
createRandomQuestionList(totalQuestions)

server.listen(PORT, () => {
    console.log('puzl-server started on port: ' + PORT);
})