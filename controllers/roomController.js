const Room = require('../models/roomModel');
const { randomid, tokenVerify } = require('../helpers/functions');

const getRooms = async (req, res) => {
    try {
        const verifiedToken = await tokenVerify(req);
        console.log('______', verifiedToken);
        if (verifiedToken === "unauthorized") {
            res.statusCode = 401;
            res.setHeader('Content-Type', 'application/json');
            res.write(JSON.stringify({
                message: 'Unauthorized Access!'
            }));
            return res.end();
        } else if (verifiedToken === "forbidden") {
            res.statusCode = 403;
            res.setHeader('Content-Type', 'application/json');
            res.write(JSON.stringify({
                message: "user doesn't exist"
            }));
            return res.end();
        }

        const rooms = await Room.readMyRooms(verifiedToken);
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

const createRoom = async (req, res) => {
    try {
        const verifiedToken = await tokenVerify(req);
        if (verifiedToken === "unauthorized") {
            res.statusCode = 401;
            res.setHeader('Content-Type', 'application/json');
            res.write(JSON.stringify({
                message: 'Unauthorized Access!'
            }));
            return res.end();
        } else if (verifiedToken === "forbidden") {
            res.statusCode = 403;
            res.setHeader('Content-Type', 'application/json');
            res.write(JSON.stringify({
                message: "user doesn't exist"
            }));
            return res.end();
        }

        const roomId = randomid();

        const result = await Room.addRoom(verifiedToken, roomId);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify({
            message: 'Room Created Successful',
            data: result
        }));
        res.end();
    } catch (error) {
        console.error(error);
        res.end();
    }
}

module.exports = {
    createRoom,
    getRooms
};