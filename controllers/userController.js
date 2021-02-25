const User = require('../models/userModel');

const createUser = async (req, res) => {
    let body = [];
    try {
        req.on('error', (err) => {
            console.error(err);
        }).on('data', async function (data) {
            await body.push(data);
        }).on('end', async function () {
            body = await Buffer.concat(body).toString();
            body = JSON.parse(body);
            res.on('error', (err) => {
                console.error(err);
            });

            const result = await User.addUser(body.names, body.email, body.password);

            if (result.error) {
                res.statusCode = 409;
                res.setHeader('Content-Type', 'application/json');
                res.write(JSON.stringify({
                    message: 'Email used by another person'
                }));
                return res.end();
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.write(JSON.stringify({
                message: 'User Account Created'
            }));
            res.end();
        });
    } catch (error) {
        console.error(error);
        res.end();
    }
}

const authUser = async (req, res) => {
    let body = [];
    try {
        req.on('error', (err) => {
            console.error(err);
        }).on('data', async function (data) {
            await body.push(data);
        }).on('end', async function () {
            body = await Buffer.concat(body).toString();
            body = JSON.parse(body);
            res.on('error', (err) => {
                console.error(err);
            });

            const result = await User.loginUser(body.email, body.password);

            if (result.rowCount === 0) {
                res.statusCode = 403;
                res.setHeader('Content-Type', 'application/json');
                res.write(JSON.stringify({
                    message: 'Email or Password incorect',
                    data: result
                }));
                return res.end();
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.write(JSON.stringify({
                message: 'User Authentication',
                data: {
                    ...result,
                    token: result.data[0].user_id
                }
            }));
            res.end();
        });
    } catch (error) {
        console.error(error);
        res.end();
    }
}

const allUser = async (req, res) => {
    try {
        const readAllQuery = 'SELECT * FROM tbl_user';
        const data = await User.query(readAllQuery);
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.writeHead(200);
        res.write(JSON.stringify({
            data: data
        }));
        return res.end();
    } catch (error) {
        return res.end(error);
    }
}

module.exports = {
    authUser,
    allUser,
    createUser
};