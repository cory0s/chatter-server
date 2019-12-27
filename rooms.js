const rooms = [];

const addRoom = (room) => {

    if(!rooms.includes(room)){
        rooms.push(room);
    }

    return rooms;
}

const removeRoom = (room) => {

}

module.exports = { addRoom, removeRoom };