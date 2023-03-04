const mongoose = require('mongoose');

const pictureSchema = new mongoose.Schema({
    link: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    }
});

const Picture = mongoose.model('Picture', pictureSchema);
module.exports = Picture;