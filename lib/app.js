const express = require('express');
const app = express();
const morgan = require('morgan');

const studios = require('./routes/studios');

app.use(morgan('dev'));

app.use('/studios', studios);
app.use('/foo', (req, res) => {
    res.send('the foo is ');
});

module.exports = app;