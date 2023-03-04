const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowecase: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email format is not correct!');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot be set as password!');
            }
        }
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;