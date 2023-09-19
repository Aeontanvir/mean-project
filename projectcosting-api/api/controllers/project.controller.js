const ObjectId = require('mongoose').Types.ObjectId;
const CONSTANTS = require("../constants");
const Project = require("../model/project.model");
const ResponseBuilder = require("../util/ResponseBuilder");

let response = null;

const _buildErrorJson = function (error) {
    response = ResponseBuilder.buildError({ statusCode: CONSTANTS.STATUS.VALIDATION_ERROR, message: CONSTANTS.API_MESSAGE.VALIDATION_ERROR, error: error });
}
const _buildSuccessJson = function (resp, message) {
    response = ResponseBuilder.buildSuccess({ statusCode: CONSTANTS.STATUS.RESPONSE_0K_CODE, message: message, data: resp })
}

const _buildPaginationSuccessJson = function ({data, total, offset, limit}, message) {
    response = ResponseBuilder.buildPaginationSuccess({ statusCode: CONSTANTS.STATUS.RESPONSE_0K_CODE, message: message, data: data, total, offset, limit })
}

const _sendResponse = function (res) {
    ResponseBuilder.send(res, response);
}

const getAll = function (req, res) {
    const offset = parseInt(req.query.offset);
    const limit = parseInt(req.query.limit);
    Promise.all([Project.find({userId: req.user._id}).skip(offset * limit).limit(limit), Project.countDocuments()])
        .then(([projects, totalCount]) => _buildPaginationSuccessJson({ data: projects, limit, offset, total: totalCount }, CONSTANTS.API_MESSAGE.RETRIVE_SUCCESS))
        .catch(error => _buildErrorJson(error))
        .finally(() => _sendResponse(res));

}

const getOne = function (req, res) {
    const id = req.params.id;
    Project.findOne({ _id: new ObjectId(id) })
        .then(resp => _buildSuccessJson(resp, CONSTANTS.API_MESSAGE.RETRIVE_SUCCESS))
        .catch(error => _buildErrorJson(error))
        .finally(() => _sendResponse(res));
}

const create = function (req, res) {
    const project = new Project({
        title: req.body.title,
        description: req.body.description,
        budget: req.body.budget,
        userId: req.user._id,
    });
    project.save()
        .then(resp => _buildSuccessJson(resp, CONSTANTS.API_MESSAGE.CREATE_SUCCESS))
        .catch(error => _buildErrorJson(error))
        .finally(() => _sendResponse(res));
}

const update = function (req, res) {
    const id = req.params.id;
    const project = {
        title: req.body.title,
        description: req.body.description,
        budget: req.body.budget,
        userId: req.user._id,
    };
    Project.findByIdAndUpdate({ _id: new ObjectId(id) }, project)
        .then(resp => _buildSuccessJson(resp, CONSTANTS.API_MESSAGE.UPDATE_SUCCESS))
        .catch(error => _buildErrorJson(error))
        .finally(() => _sendResponse(res));
}

const removeOne = function (req, res) {
    const id = req.params.id;
    Project.findOneAndRemove({ _id: new ObjectId(id) })
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