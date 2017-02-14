const express = require('express');
const app = express();
const films = require('./routes/films');
const actors = require('./routes/actors');
const studios = require('./routes/studios');
const reviews = require('./routes/reviews');

const morgan = require('morgan');
app.use(morgan('dev'));

app.use('/films', films);
app.use('/actors', actors);
app.use('/studios', studios);
app.use('/reviews', reviews);

module.exports = app;