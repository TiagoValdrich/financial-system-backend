let env;

if (process.env.NODE_ENV === 'development') {
    env = require('../environments/development');
} else if (process.env.NODE_ENV === 'test') {
    env = require('../environments/tests');
} else {
    throw new Error('Invalid environment. NODE_ENV is not defined.');
}

module.exports.env = env;