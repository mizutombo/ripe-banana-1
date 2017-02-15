const express = require('express');
const app = express();
const morgan = require('morgan');
const errorHandler = require('./error-handler')();

const studios = require('./routes/studios');
const actors = require('./routes/actors');
const films = require('./routes/films');
// const reviews = require('./reviews');

// dev tool to see requests in the terminal
app.use(morgan('dev'));

// '/studios' is the path, `studios` loads the functionality from the `require`
app.use('/studios', studios);
app.use('/actors', actors);
app.use('/films', films);
// app.use('/reviews', reviews);

app.use(errorHandler);

// const path = require('path');
// const publicPath = path.join(_dirname, '../public');
// app.use(express.static(publicPath));

module.exports = app;