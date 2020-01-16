const rooms = [];

const addRoom = (room) => {

    if(!rooms.includes(room)){
        rooms.push(room);
    }

    return rooms;
}

const getRooms = () => {
    if(rooms.length < 1){
        return ['No Rooms Available'];
    }
    return rooms;
}

const removeRoom = (room) => {
    
    return rooms.filter((existingRoom) => existingRoom != room);
}

module.exports = { addRoom, getRooms, removeRoom };