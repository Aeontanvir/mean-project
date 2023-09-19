const mongoose = require("mongoose");
const CONSTANTS = require("../constants");
const cmd = require("../util/cmd");

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;

db.on('error', console.error.bind(console, CONSTANTS.CONSOLE_MESSAGE.MONGOOES_CONNECTION_ERROR));
db.once('open', function () {
    cmd.write(CONSTANTS.CONSOLE_MESSAGE.MONGOOES_CONNECTION_SUCCESS);
});

module.exports = db;