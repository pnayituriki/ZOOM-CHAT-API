const Room = require('../models/roomModel');
const { randomid } = require('../helpers/functions');

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

const createRoom = async (req, res) => {
    try {
        if (req.headers['authorization'] === undefined) {
            res.statusCode = 401;
            res.setHeader('Content-Type', 'application/json');
            res.write(JSON.stringify({
                message: 'Unauthorized Access!'
            }));
            return res.end();
        }
        const userId = parseInt(req.headers['authorization'].split('Bearer ')[1]);
        console.log("header..", userId);
        const roomId = randomid();

        const result = await Room.addRoom(userId, roomId);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify({
            message: 'Room Created Successful',
            data: result
        }));
        res.end();

        // req.on('error', (err) => {
        //     console.error(err);
        // }).on('data', async function (data) {
        //     await body.push(data);
        // }).on('end', async function () {
        //     body = await Buffer.concat(body).toString();
        //     body = JSON.parse(body);
        //     res.on('error', (err) => {
        //         console.error(err);
        //     });


        // });
    } catch (error) {
        console.error(error);
        res.end();
    }
}

module.exports = {
    createRoom,
    getRooms
};