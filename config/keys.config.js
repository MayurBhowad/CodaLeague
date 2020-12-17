process.env.NODE_ENV === 'production' ?
    module.exports = require('./prodKeys.config') : module.exports = require('./devKeys.config');
