const pool = require('../config/database');

const addUser = async (name, email, password) => {
    const check_email = await isUserExist('user_email', email);
    if (check_email) {
        console.log('exist', check_email)
        return {
            error: true
        }
    }
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO tbl_user(user_name,user_email,user_password) VALUES('${name}','${email}','${password}')`;
        pool
            .query(sql)
            .then((res) => {

                const data = {
                    data: res.rows,
                    rowCount: res.rowCount,
                    error: false
                }
                resolve(data);
            })
            .catch((err) => {
                console.log(err)
                reject(err);
            });
    })
}

const loginUser = (username, password) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM tbl_user WHERE user_email = '${username}' AND user_password = '${password}'`;
        pool
            .query(sql)
            .then((res) => {

                const data = {
                    data: res.rows,
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

const isUserExist = (field, user_id) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM tbl_user WHERE ${field} = '${user_id}'`;
        pool
            .query(sql)
            .then((res) => {
                const data = res.rowCount > 0 ? true : false;
                resolve(data);
            })
            .catch((err) => {
                console.log(err)
                reject(err);
            });
    })
}

module.exports = {
    loginUser,
    query,
    isUserExist,
    addUser
};