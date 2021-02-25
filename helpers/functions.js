const User = require('../models/userModel');

const randomid = (range = 1000) => {
    return Math.floor((Math.random() * range) + 1);
}

const tokenVerify = async (req) => {
    if (req.headers['authorization'] === undefined) {
        return "unauthorized";
    }
    const userId = req.headers['authorization'].split('Bearer ')[1];
    let isnum = /^\d+$/.test(userId)
    if (!isnum) {
        return "forbidden";
    }
    const check_id = await User.isUserExist('user_id', userId);
    if (!check_id) {
        return "forbidden";
    } else {
        return userId;
    }
}

module.exports = {
    randomid,
    tokenVerify
}