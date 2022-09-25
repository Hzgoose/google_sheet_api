var winston = require('winston'),
    moment = require('moment');

var getDailyLogName = function () {
    return 'logs/' + moment().format('YYYY_MM_DD') +'_systems.log';
};

var rotateLogger = new winston.createLogger({
    level: 'info',
    json: false,
    transports: [
        new (winston.transports.File)({
            filename: getDailyLogName(),
            handleExceptions: true,
            json: false
        })
    ]
});

exports.logError = function(message, obj, error) {
    rotateLogger.error(message, obj, error);
};

exports.logInfo = function(message, obj) {
    rotateLogger.info(message, obj);
};
