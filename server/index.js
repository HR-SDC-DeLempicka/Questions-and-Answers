const express = require('express');
const app = express();
const port = 3000;
const router = require('./route.js');

app.use(express.json());
app.use('/api', router);

app.listen(port, () => {console.log(`Listening on port ${port}`)});

module.exports = app;