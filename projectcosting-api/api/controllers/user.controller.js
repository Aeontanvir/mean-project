const ObjectId = require('mongoose').Types.ObjectId;
const CONSTANTS = require("../constants");
const User = require("../model/user.model");
const ResponseBuilder = require("../util/ResponseBuilder");
const bcrypt = require('bcrypt');

const token = require("../auth/token")


let response = null;

const _buildErrorJson = function (error) {
    response = ResponseBuilder.buildError({ statusCode: CONSTANTS.STATUS.VALIDATION_ERROR, message: CONSTANTS.API_MESSAGE.VALIDATION_ERROR, error: error });
}
const _buildSuccessJson = function (resp, message) {
    response = ResponseBuilder.buildSuccess({ statusCode: CONSTANTS.STATUS.RESPONSE_0K_CODE, message: message, data: resp })
}
const _buildLoginSuccessJson = function (resp, message) {
    response = ResponseBuilder.buildSuccess({ statusCode: CONSTANTS.STATUS.RESPONSE_0K_CODE, message: message, data: { _id: resp.user._id, name: resp.user.name, email: resp.user.email, token: resp.token } })
}

const _sendResponse = function (res) {
    ResponseBuilder.send(res, response);
}

const _getHashPassword = function (salt, user) {
    return bcrypt.hash(user.password, salt);
}
const _createUser = function (hashPassword, user) {
    user.password = hashPassword;
    return user.save();
}

const _comparePassword = function (resp, userPassword) {
    return new Promise((resolve, reject) => {
        if (!resp) {
            response = ResponseBuilder.buildError({
                statusCode: CONSTANTS.STATUS.VALIDATION_ERROR,
                message: CONSTANTS.API_MESSAGE.LOGIN_ERROR,
                error: error
            });
            reject(error);
        } else {
            bcrypt.compare(userPassword, resp.password)
                .then(result => {
                    resolve({ isMatch: result, user: resp });
                })
                .catch(error => {
                    reject(error);
                });
        }
    });
}
const _createToken = function (resp) {
    return new Promise((resolve, reject) => {
        if (!resp.isMatch) {
            response = ResponseBuilder.buildError({
                statusCode: CONSTANTS.STATUS.VALIDATION_ERROR,
                message: CONSTANTS.API_MESSAGE.LOGIN_ERROR,
                error: error
            });
            reject(error);
        } else {
            token.get({ email: resp.user.email, _id: resp.user._id })
                .then(result => {
                    resolve({ ...resp, token: result });
                })
                .catch(error => {
                    reject(error);
                });
        }
    });
}


const getAll = function (req, res) {
    User.find({})
        .then(resp => _buildSuccessJson(resp, CONSTANTS.API_MESSAGE.RETRIVE_SUCCESS))
        .catch(error => _buildErrorJson(error))
        .finally(() => _sendResponse(res));
}

const getOne = function (req, res) {
    const id = req.params.id;
    User.findOne({ _id: new ObjectId(id) })
        .then(resp => _buildSuccessJson(resp, CONSTANTS.API_MESSAGE.RETRIVE_SUCCESS))
        .catch(error => _buildErrorJson(error))
        .finally(() => _sendResponse(res));
}

const create = function (req, res) {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || 0);
    bcrypt.genSalt(SALT_ROUNDS)
        .then(salt => _getHashPassword(salt, user))
        .then(hashPassword => _createUser(hashPassword, user))
        .then(resp => _buildSuccessJson(resp, CONSTANTS.API_MESSAGE.CREATE_SUCCESS))
        .catch(error => _buildErrorJson(error))
        .finally(() => _sendResponse(res));
}

const update = function (req, res) {
    const id = req.params.id;
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    User.findByIdAndUpdate({ _id: new ObjectId(id) }, user)
        .then(resp => _buildSuccessJson(resp, CONSTANTS.API_MESSAGE.UPDATE_SUCCESS))
        .catch(error => _buildErrorJson(error))
        .finally(() => _sendResponse(res));
}


const removeOne = function (req, res) {
    const id = req.params.id;
    User.findOneAndRemove({ _id: new ObjectId(id) })
        .then(resp => _buildSuccessJson(resp, CONSTANTS.API_MESSAGE.DELETE_SUCCESS))
        .catch(error => _buildErrorJson(error))
        .finally(() => _sendResponse(res));
}

const login = function (req, res) {
    let userEmail = req.body.email
    let userPassword = req.body.password
    User.findOne({ email: userEmail })
        .then(resp => _comparePassword(resp, userPassword))
        .then(resp => _createToken(resp))
        .then(resp => _buildLoginSuccessJson(resp , CONSTANTS.API_MESSAGE.LOGIN_SUCCESS))
        .catch(error => _buildErrorJson(error))
        .finally(() => _sendResponse(res));
}

module.exports = {
    getAll: getAll,
    getOne: getOne,
    create: create,
    update: update,
    removeOne: removeOne,
    login: login,
}