const express = require('express');
const app = express();
const router = require('./route.js');
const morgan = require('morgan');

app.use(express.json());
app.use(morgan('dev'));
app.use('/api', router);

module.exports = app;