const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    rating: {
        type: Number,
        min: [0, 'Minimum rating is 0'],
        max: [5, 'Maximum rating is 5'],
        // rater(rateNum){
        //     return rateNum > 0 && rateNum <= 5;
        // },
        message: 'rate the film on a scale from 1-5, 5 being the high.' 
    },
    review: {
        type: String,
        maxlength: [140, 'Length of your film review exceeds 140 characters'],
        // reviewer(reviewMsg){
        //     return reviewMsg.length < 140;
        // },
        message: 'the length of your review must be under 140 characters.'        
    }
});

module.exports = mongoose.model('Review', schema);