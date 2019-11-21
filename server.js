const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const router = require('./router');

app.use(router);

server.listen(8000, () => {
    console.log('Server up on port 8000');
});

io.on('connection', (client) => {
    console.log('Socket connected!', client.id);

    client.on('join', ({ name,room }) => {
        console.log(name,room);
    });
    
    client.on('disconnect', () => {
        console.log('Someone left...', client.id);
    })
});

io.on('disconnect', client => {
    console.log('Socket disconnected');
});