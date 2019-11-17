const server = require('http').createServer();
const io = require('socket.io')(server);

server.listen(8000, () => {
    console.log('Server up on port 8000');
});

let socketPool = [];

io.on('connection', client => {
    console.log('Socket connected!', client.id);
    socketPool.push(client.id);
    client.emit('join', client.id);


});

io.on('disconnect', client => {
    console.log('Socket disconnected');
})