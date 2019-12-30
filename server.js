const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const router = require('./router');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js');
const { addRoom, removeRoom, getRooms } = require('./rooms.js');
const PORT = process.env.PORT || '8000';

//Use Express router and start server
app.use(router);

//Manage socket.io connections
io.on('connection', (socket) => {

    socket.on('join', ({ name,room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });
        const existingRooms = addRoom(room);

        if(error) return callback(error);

        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to ${user.room}`});
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined the room.`});
        
        socket.join(user.room);

        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        io.emit('allRoomData', { rooms: existingRooms });
        
        callback(); //Callback at front-end (if statement?)
    });
    
    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, text: message });
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room), rooms: getRooms() });

        callback(); //Do something after message is sent on FE
    })

    socket.on('disconnect', () => {
        console.log('Someone left...', socket.id);

        const user = removeUser(socket.id);
        let rooms = getRooms();

        if(getUsersInRoom(user.room).length > 0){
            rooms = removeRoom(user.room);
        }

        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room), rooms });

        if(user){
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.`});
        }
    })
});

//Start server
server.listen(PORT, () => {
    console.log(`Server up on port ${PORT}`);
});