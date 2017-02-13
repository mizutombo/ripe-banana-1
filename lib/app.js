const express = require('express');
const app = express();
const morgan = require('morgan');
app.use(morgan('dev'));

const actors = require('./routes/actors');


// const path = require('path');
// const publicPath = path.join(_dirname, '../public');
// app.use(express.static(publicPath));


app.use('/actors', actors);

app.use('/foo', (req, res) => {
    res.send('the foo is ');
});

module.exports = app;