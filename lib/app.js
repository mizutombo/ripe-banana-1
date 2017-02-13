const express = require('express');
const app = express();
const films = require('./routes/films');

const morgan = require('morgan');
app.use(morgan('dev'));

app.use('/films', films);

module.exports = app;