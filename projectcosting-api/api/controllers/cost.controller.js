const ObjectId = require('mongoose').Types.ObjectId;
const CONSTANTS = require("../constants");
const Cost = require("../model/cost.model");
const ResponseBuilder = require("../util/ResponseBuilder");

let response = null;

const _buildErrorJson = function (error) {
    response = ResponseBuilder.buildError({ statusCode: CONSTANTS.STATUS.VALIDATION_ERROR, message: CONSTANTS.API_MESSAGE.VALIDATION_ERROR, error: error });
}
const _buildSuccessJson = function (resp, message) {
    response = ResponseBuilder.buildSuccess({ statusCode: CONSTANTS.STATUS.RESPONSE_0K_CODE, message: message, data: resp })
}

const _sendResponse = function (res) {
    ResponseBuilder.send(res, response);
}

const getAll = function (req, res) {
    const quaryParams = {
        projectId: req.query.projectid
    }
    Cost.find({ ...quaryParams })
        .then(resp => _buildSuccessJson(resp, CONSTANTS.API_MESSAGE.RETRIVE_SUCCESS))
        .catch(error => _buildErrorJson(error))
        .finally(() => _sendResponse(res));
}

const getOne = function (req, res) {
    const id = req.params.id;
    Cost.findOne({ _id: new ObjectId(id) }).findOne({ _id: new ObjectId(id) })
        .then(resp => _buildSuccessJson(resp, CONSTANTS.API_MESSAGE.RETRIVE_SUCCESS))
        .catch(error => _buildErrorJson(error))
        .finally(() => _sendResponse(res));
}

const create = function (req, res) {
    const cost = new Cost({
        title: req.body.title,
        description: req.body.description,
        amount: req.body.amount,
        projectId: req.body.projectId
    });
    cost.save()
        .then(resp => _buildSuccessJson(resp, CONSTANTS.API_MESSAGE.CREATE_SUCCESS))
        .catch(error => _buildErrorJson(error))
        .finally(() => _sendResponse(res));
}

const update = function (req, res) {
    const id = req.params.id;
    const cost = {
        title: req.body.title,
        description: req.body.description,
        amount: req.body.amount
    };
    Cost.findByIdAndUpdate({ _id: new ObjectId(id) }, cost)
        .then(resp => _buildSuccessJson(resp, CONSTANTS.API_MESSAGE.UPDATE_SUCCESS))
        .catch(error => _buildErrorJson(error))
        .finally(() => _sendResponse(res));
}

const removeOne = function (req, res) {
    const id = req.params.id;
    Cost.findOneAndRemove({ _id: new ObjectId(id) })
        .then(resp => _buildSuccessJson(resp, CONSTANTS.API_MESSAGE.DELETE_SUCCESS))
        .catch(error => _buildErrorJson(error))
        .finally(() => _sendResponse(res));
}

module.exports = {
    getAll: getAll,
    getOne: getOne,
    create: create,
    update: update,
    removeOne: removeOne,
}