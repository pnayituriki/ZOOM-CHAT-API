const pool = require('../config/database');

const loginUser = () => {
    return new Promise((resolve, reject) => {
        resolve({ message: 'user login' })
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