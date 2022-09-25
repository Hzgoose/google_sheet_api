
exports.loginData = function (userInfo) {
    return {
        "userId" : userInfo.id || 0,
        "userEmail" : userInfo.email || "",
        "firstName" : userInfo.firstName || "",
        "lastName" : userInfo.lastName || "",
        "role" : userInfo.role || "",
        "accessToken" : userInfo.accessToken || "",
        "refreshToken" : userInfo.refreshToken || ""
    }
};

exports.registerData = function (data) {
    return {
        "data" : data
    }
};