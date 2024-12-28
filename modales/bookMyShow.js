/* eslint-disable no-undef */
const mongoose = require('mongoose');
const { Schema } = mongoose;
const multer = require('multer');
const path = require('path');
const imagePath = "/uploads";

const bookMyShowSchema = new Schema({
    movieName: {
        type: String,
        required: true
    },
    ratings: {
        type: Number,
        required: true
    },
    movieType: {
        type: Array,
        required: true
    },
    language: {
        type: Array,
        required: true
    },
    movieGenre: {
        type: Array,
        required: true
    },
    movieDescription: {
        type: String,
        required: true
    },
    movieImage: {
        type: String,
        required: true
    },
    movieDate: {
        type: String,
        required: true
    },
    uaAge: {
        type: Number,
        required: true
        },
    movieTami: {
        type: String,
        required: true
    },
    reviewsCommit: {
         type: mongoose.Schema.Types.ObjectId,
        ref: 'reviews',
        required: true
    }

});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', imagePath))
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now()
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

bookMyShowSchema.statics.uploadedAvatar = multer({ storage: storage }).single('movieImage');
bookMyShowSchema.statics.imgPath = imagePath

const bookMyShow = mongoose.model('bookMyShow', bookMyShowSchema);
module.exports = bookMyShow;