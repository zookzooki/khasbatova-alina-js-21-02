const context = require('request-context');

const options = {
    logDirectory:'./logs',
    fileNamePattern: '<DATE>.log',
    dateFormat: 'DD.MM.YYYY',
}

const logger = require('simple-node-logger').createRollingFileLogger(options);

module.exports = {
    ...logger,
    info: (message) => logger.info(context.get('uuid'), ' ', message),
    error: (message) => logger.error(context.get('uuid'), ' ', message),
    fatal: (message) => logger.fatal(context.get('uuid'), ' ', message),
}
