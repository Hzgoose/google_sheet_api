exports.response = function (code, data, message) {
    return {
        data: data,
        status: {
            code: code,
            message: message
        },
    };
};