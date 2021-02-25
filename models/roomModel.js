const pool = require('../config/database');


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

module.exports = { readMyRooms };