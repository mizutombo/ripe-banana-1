const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    dob: Date

});

module.exports = mongoose.model('Actor', schema);