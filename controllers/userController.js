const User = require('../models/userModel');

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


            const result = await User.loginUser(body.username, body.password);

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.write(JSON.stringify({
                message: 'User Authentication',
                data: result
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
    allUser
};