const Room = require('../models/roomModel');

const getRooms = async (req, res, user_id) => {
    try {
        const rooms = await Room.readMyRooms(user_id);
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.writeHead(200);
        res.write(JSON.stringify({
            message: 'List of All Personal Rooms',
            data: rooms
        }));
        return res.end()
    } catch (error) {
        res.end();
        console.log(error);
    }
}

module.exports = { getRooms };