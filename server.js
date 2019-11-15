const server = require('http').createServer();
const io = require('socket.io')(server);

server.listen(80, () => {
    console.log('Server up on port 80');
});

io.on('connection', (client) => {
    console.log('Socket connected:', client);
    client.on('join', { hello: world });
})