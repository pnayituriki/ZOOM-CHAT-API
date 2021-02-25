const pool = require('../config/database');

const loginUser = (username, password) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM tbl_user WHERE user_email = '${username}' AND user_password = '${password}'`;
        pool
            .query(sql)
            .then((res) => {
                console.log('id')
                const data = {
                    data: res.rows,
                    token: res.rows[0].user_id,
                    rowCount: res.rowCount
                }
                resolve(data);
            })
            .catch((err) => {
                console.log(err)
                reject(err);
            });
    })
}

const query = (text) => {
    return new Promise((resolve, reject) => {
        pool
            .query(text)
            .then((res) => {
                const data = { rows: res.rows, rowCount: res.rowCount }
                resolve(data);
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
    });
}

module.exports = { loginUser, query };