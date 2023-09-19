const express = require("express");
require("dotenv").config();
const cmd = require("./util/cmd")
const app = express();
const db = require('./config/db');
const router = require("./router")
const constants = require("./constants");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", function (req, res, next) {
    res.header(constants.CONFIG.ALLOW_CONTROL_ALLOW_ORIGIN, process.env.ALLOW_CONTROL_ALLOW_ORIGIN_URL)
    res.header(constants.CONFIG.ALLOW_CONTROL_ALLOW_METHODS, process.env.ALLOW_CONTROL_ALLOW_METHODS)
    res.header(constants.CONFIG.ALLOW_CONTROL_ALLOW_HEADERS, process.env.ALLOW_CONTROL_ALLOW_HEADERS);
    next();
})

app.use("/", function (req, res, next) {
    cmd.write(`-->> Monitor All Request: ${req.path} | Method: ${req.method}`);
    next();
})

app.use("/api", router)

app.listen(process.env.PORT, cmd.onServerStart)