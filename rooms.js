const rooms = [];

const addRoom = (room) => {

    if(!rooms.includes(room)){
        rooms.push(room);
    }

    return rooms;
}

const getRooms = () => {

    return rooms;
}

const removeRoom = (room) => {
    
    return rooms.filter((existingRoom) => existingRoom != room);
}

module.exports = { addRoom, getRooms, removeRoom };