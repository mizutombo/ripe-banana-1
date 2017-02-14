const express = require('express');
const app = express();
const morgan = require('morgan');

const studios = require('./routes/studios');
const actors = require('./routes/actors');

// dev tool to see requests in the terminal
app.use(morgan('dev'));

// '/studios' is the path, `studios` loads the functionality from the `require`
app.use('/studios', studios);
app.use('/actors', actors);

// const path = require('path');
// const publicPath = path.join(_dirname, '../public');
// app.use(express.static(publicPath));

module.exports = app;