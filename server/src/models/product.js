const mongoose = require('mongoose');
const validator = require('validator');


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    price:{
        type: Number,
        required: true,
        validate(value){
            if(value<=0){
                throw new Error('Price cannot be less than or equal to 0');
            }
        }
    },
    description: {
        type: String,
        required: true
    }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;