if(process.env.NODE_ENV !== "production") {
    require('dotenv').config()
};


const express = require('express');
const connectDB = require('./config/db');
const chats = require('./data/chats')
connectDB();

const app = express()

app.get('/', (req, res) => {
    res.send('zazaza')
})

app.get('/api/chat', (req, res) => {
    res.send(chats)
})

app.get('/api/chat/:id', (req, res) => {
    const singleChat = chats.find((c) => c._id === req.params.id);
    res.send(singleChat)
})

const PORT = process.env.PORT || 3002

app.listen(PORT, console.log(`Server started on port ${PORT}`))