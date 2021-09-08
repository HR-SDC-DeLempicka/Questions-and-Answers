require('newrelic');
const express = require('express');
const app = express();
const compression = require('compression');
const router = require('./route.js');
const morgan = require('morgan');

app.use(express.json());
// app.use(morgan('dev'));
app.use(express.static('public'));
app.use(compression());
app.use('/api', router);

module.exports = app;