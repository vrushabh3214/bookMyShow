const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewsSchema = new Schema({
    reviewsCommit: {
        type: String,
        required: true
    },
   

});

const reviews = mongoose.model('reviews', reviewsSchema);
module.exports = reviews;