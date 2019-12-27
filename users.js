const users = [];
const rooms = [];

const addUser = ({ id, name, room }) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = users.find((user) => user.name === name && user.room === room);

    if(existingUser){
        return ( { error: 'Username is already taken!'});
    }

    const user = { id, name, room };
    users.push(user);

    return { user };
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if(index != -1){
        return users.splice(index, 1)[0];
    }
}

const getUser = (id) => {

    return users.find((user) => user.id === id);
}

const getUsersInRoom = (room) => {

    return users.filter((user) => user.room === room);
}

const getRooms = () => {

    return rooms;
}

const removeRoom = (id) => {
    let room;
    let count = 0;

    users.forEach(user => {
        if(user.id === id){
            room = user.room;
        }
    });

    users.forEach(user => {
        if(user.room === room){
            count++;
        }
    });
    // console.log('before splice', rooms);
    // console.log('current room', room);
    if(count < 1){
        rooms.splice(rooms.indexOf(room), 1);
    }
    // console.log('removeRoom', rooms, count);
    return rooms;
}

module.exports = { addUser, removeUser, getUser, getUsersInRoom, getRooms, removeRoom };