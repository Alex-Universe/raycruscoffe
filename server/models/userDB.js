/*
 * USER DB CONNECTOR
 */

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let validRoles = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} Itsnt a valid Role'
}

let userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'The name its required']
    },
    nickname: {
        unique: true,
        type: String,
        required: false
    },
    email: {
        index: true,
        unique: true,
        type: String,
        required: [true, 'The e-mail its required']
    },
    password: {
        type: String,
        required: [true, 'The password its required']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: validRoles //Define enumerator with valid values
    },
    state: {
        type: Boolean,
        required: false,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

userSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' })

userSchema.methods.toJSON = function() {
    let userObject = this.toObject();
    delete userObject.password;
    //delete userObject.role;
    //delete userObject.state;
    delete userObject.__v;
    //delete userObject.google;

    return userObject;
}

module.exports = mongoose.model('User', userSchema)