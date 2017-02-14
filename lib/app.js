const express = require('express');
const app = express();
const morgan = require('morgan');

const studios = require('./routes/studios');

// dev tool to see requests in the terminal
app.use(morgan('dev'));

// '/studios' is the path, `studios` loads the functionality from the `require`
app.use('/studios', studios);

module.exports = app;