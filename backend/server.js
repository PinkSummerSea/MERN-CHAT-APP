if(process.env.NODE_ENV !== "production") {
    require('dotenv').config()
};


const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const messageRoutes = require('./routes/messageRoutes')
const {notFound, errorHandler} = require('./middleware/errorMiddleware')
connectDB();
const path = require('path')

const app = express()
const httpServer = require("http").createServer(app);

app.use(express.json()) // to accept json data



app.use('/api/user', userRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/message', messageRoutes)


// ============= DEPLOYMENT =======================

const __dirname1 = path.resolve()
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname1, '/frontend/build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
    })
} else {
    app.get('/', (req, res) => {
        res.send('API is running')
    })
}

// ============= DEPLOYMENT =======================

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 3002

// const server = app.listen(PORT, console.log(`Server started on port ${PORT}`))

const io = require('socket.io')(httpServer, {
    pingTimeOut: 60000,
    cors: {
        origin: "https://dry-cliffs-96197.herokuapp.com/"
    }
})

io.on("connection", (socket) => {
    console.log('connected to socket.io')

    socket.on('setup', (userData) => {
        socket.join(userData._id)
        //console.log(userData._id)
        socket.emit('connected')
    })

    socket.on('join chat', (room)=>{
        socket.join(room)
        console.log('user joined room:' + room)  
    })

    socket.on('typing', (room) => socket.in(room).emit("typing"))
    socket.on('stop typing', (room) => socket.in(room).emit("stop typing"))

    socket.on('new message', (newMessageReceived) => {
        let chat = newMessageReceived.chat;
        if (!chat.users) return console.log('chat.users not defined')

        chat.users.forEach(user => {
            if (user._id == newMessageReceived.sender._id) return;

            socket.in(user._id).emit('message received', newMessageReceived)
        });
    })

    socket.off('setup', ()=>{
        console.log("user disconnected")
        socket.leave(userData._id)
    })
})

httpServer.listen(PORT)