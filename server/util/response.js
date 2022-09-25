const SUCCESS_CODE = 200;
const SUCCESS_MESSAGE = 'Success';

exports.BAD_CODE = 400;
exports.BAD_MESSAGE = 'System Error';
exports.INVALID_REQUEST_MESSAGE = 'Invalid Request';

exports.AUTHENTICATE_CODE = 401;
exports.AUTHENTICATE_MESSAGE = 'invalid token';

exports.INVALID_ROLE = 'This feature for doctor.';
exports.INVALID_ROLE_ADMIN = 'This feature for admin';

exports.response = function (data, code, message) {
    var resObject = {status: {code: SUCCESS_CODE, message: SUCCESS_MESSAGE}};

    if (code !== undefined && message !== undefined) {
        resObject = {status: {code: code, message: message}};
    }

    if (data !== undefined) {
        resObject.data = data;
    } else {
        resObject.data = [];
    }

    return resObject;
};

exports.listResponse = function (data, total, code, message) {
    var resObject = {status: {code: SUCCESS_CODE, message: SUCCESS_MESSAGE}};

    if (code !== undefined && message !== undefined) {
        resObject = {status: {code: code, message: message}};
    }

    if (data !== undefined) {
        resObject.total = total;
    }

    if (data !== undefined) {
        resObject.data = data;
    } else {
        resObject.data = [];
    }

    return resObject;
};

exports.error = function (code, message) {
    return {"error": code, "message": message};
};
