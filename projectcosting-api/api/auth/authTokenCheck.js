const jwt = require('jsonwebtoken');
const constants = require('../constants');

function authTokenCheck(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(constants.STATUS.AUTH_ERROR);
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        console.log(err);
        if (err) {
            return res.sendStatus(constants.STATUS.AUTH_ERROR);
        }
        req.user = user;
        next();
    });
}
module.exports = authTokenCheck;