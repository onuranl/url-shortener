const mongoose = require('mongoose');
const shortId = require('shortid');

const shortUrlSchema = new mongoose.Schema({
    fullURL: {
        type: String,
        required: true,
    },
    shortURL: {
        type: String,
        required: true,
        default: shortId.generate
    },
    click: {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = mongoose.model('shortUrl', shortUrlSchema)