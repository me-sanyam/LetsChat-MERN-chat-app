const express = require('express');
const cors = require('cors');
const ConnectDatabase = require('./database.js');
const auth = require('./routes/auth.js');
const chat = require('./routes/chat.js');
const message = require('./routes/messages.js');
const socketIo = require('socket.io');

ConnectDatabase();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', auth);
app.use('/api/chats', chat);
app.use('/api/message', message);

const server  = app.listen(process.env.PORT, () => {
    console.log('Server Running on port:', process.env.PORT);
})

const io = socketIo(server,{
    pingTimeout: 60000,
    cors:{
        origin:"http://localhost:3000"
    }
});

io.on('connection', (socket) => {
    console.log('Socket Connection Successful');

    require('./chatLib.js')(socket);

    socket.on('disconnect', () => {
        console.log('--> Disconnected');
    });
});