const ObjectId = require('mongoose').Types.ObjectId;
const CONSTANTS = require("../constants");
const Project = require("../model/project.model");
const Cost = require("../model/cost.model");
const ResponseBuilder = require("../util/ResponseBuilder");

let response = null;

const _buildErrorJson = function (error) {
    response = ResponseBuilder.buildError({ statusCode: CONSTANTS.STATUS.VALIDATION_ERROR, message: CONSTANTS.API_MESSAGE.VALIDATION_ERROR, error: error });
}
const _buildSuccessJson = function (resp, message) {
    response = ResponseBuilder.buildSuccess({ statusCode: CONSTANTS.STATUS.RESPONSE_0K_CODE, message: message, data: resp })
}

const _buildPaginationSuccessJson = function ({ data, total, offset, limit }, message) {
    response = ResponseBuilder.buildPaginationSuccess({ statusCode: CONSTANTS.STATUS.RESPONSE_0K_CODE, message: message, data: data, total, offset, limit })
}

const _sendResponse = function (res) {
    ResponseBuilder.send(res, response);
}

const getLastProject = function (req, res) {
    Project.find({ userId: req.user._id }).limit(1)
        .then((projects) => _buildPaginationSuccessJson({ data: projects, limit: 1, offset: 0 }, CONSTANTS.API_MESSAGE.RETRIVE_SUCCESS))
        .catch(error => _buildErrorJson(error))
        .finally(() => _sendResponse(res));

}

const getLastCost = function (req, res) {
    Cost.find().limit(1)
        .then(resp => _buildSuccessJson(resp, CONSTANTS.API_MESSAGE.RETRIVE_SUCCESS))
        .catch(error => _buildErrorJson(error))
        .finally(() => _sendResponse(res));
}

const getProjectCount = function (req, res) {
    Project.countDocuments({ userId: req.user._id })
        .then(resp => _buildSuccessJson(resp, CONSTANTS.API_MESSAGE.RETRIVE_SUCCESS))
        .catch(error => _buildErrorJson(error))
        .finally(() => _sendResponse(res));
}

const getCostCount = function (req, res) {
    Cost.countDocuments({ })
        .then(resp => _buildSuccessJson(resp, CONSTANTS.API_MESSAGE.RETRIVE_SUCCESS))
        .catch(error => _buildErrorJson(error))
        .finally(() => _sendResponse(res));
}



module.exports = {
    getLastProject: getLastProject,
    getLastCost: getLastCost,
    getProjectCount: getProjectCount,
    getCostCount: getCostCount
}