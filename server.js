const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const router = require('./router');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js');
const PORT = process.env.PORT || '8000';

//Use Express router and start server
app.use(router);

//Manage socket.io connections
io.on('connection', (socket) => {

    socket.on('join', ({ name,room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });

        if(error) return callback(error);

        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to ${user.room}`});
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined the room.`})
        
        socket.join(user.room);

        // callback(); //Callback at front-end (if statement?)
    });
    
    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, text: message });

        callback(); //Do something after message is sent on FE
    })

    socket.on('disconnect', () => {
        console.log('Someone left...', socket.id);
    })
});

//Start server
server.listen(PORT, () => {
    console.log(`Server up on port ${PORT}`);
});