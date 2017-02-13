const express = require('express');
const app = express();
const morgan = require('morgan');
app.use(morgan('dev'));

const studio = require('./routes/studio-routes');

app.use('/studio', studio);

module.exports = app;