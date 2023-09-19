module.exports.send = function(res, responseJson){
    res.status(responseJson.statusCode)
        .json(responseJson);
}

module.exports.buildSuccess = function({statusCode, message, data}){
    return {
        statusCode: statusCode,
        message: message,
        data: data,
    }
}
module.exports.buildPaginationSuccess = function({statusCode, message, data, total, offset, limit}){
    return {
        statusCode: statusCode,
        message: message,
        data: data,
        total,
        offset,
        limit
    }
}
module.exports.buildError = function({statusCode, message, error}){
    return {
        statusCode: statusCode,
        message: message,
        error: error,
    }
}