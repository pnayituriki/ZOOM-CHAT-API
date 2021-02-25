const User = require('../models/userModel');

const authUser = async (req, res) => {
    let body = "";
    try {
        req.on('data', function (data) {
            body += data
            console.log('Partial body: ' + body)
        })
        req.on('end', function () {
            console.log('Body: ' + body)
            res.write(JSON.stringify({
                message: 'Route for user Login Post',
                data: body
            }));
            res.end();

        })

    } catch (error) {
        console.log(error);
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