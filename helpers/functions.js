const randomid = (range = 1000) => {
    return Math.floor((Math.random() * range) + 1);
}

module.exports = {
    randomid
}