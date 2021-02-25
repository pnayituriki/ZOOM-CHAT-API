const pool = require('../config/database');

const addRoom = (user_id, room_key) => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO tbl_rooms(room_key,user_id) VALUES(${room_key},${user_id})`;
        pool
            .query(sql)
            .then((res) => {
                console.log('room created', res)
                const data = {
                    room_key: room_key
                }
                resolve(data);
            })
            .catch((err) => {
                console.log(err)
                reject(err);
            });
    })
}

const readMyRooms = (user_id) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM tbl_rooms WHERE user_id = ${user_id}`;
        pool
            .query(sql)
            .then((res) => {
                const data = { rows: res.rows, rowCount: res.rowCount }
                resolve(data);
            })
            .catch((err) => {
                console.log(err)
                reject(err);
            });
    })
}

module.exports = {
    addRoom,
    readMyRooms
};