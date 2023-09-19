const jwt = require('jsonwebtoken');
const util = require('util');

const signJwt = util.promisify(jwt.sign);

function generateAccessToken(username) {
    return signJwt(username, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRES });
}

module.exports = { get: generateAccessToken };