const options = require('./config/config.js');
const Pool = require('pg').Pool;
const pool = new Pool(options);

module.exports = pool;