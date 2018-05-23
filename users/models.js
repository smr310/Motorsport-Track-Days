'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    registeredEvents: [{
            trackName: { type: String, required: true },
            eventDate: { type: Date, required: true },
            needToRentBike: { type: Boolean, required: true },
            needToRentHelmet: { type: Boolean, required: true },
            needToRentSuit: { type: Boolean, required: true },
            needToRentGloves: { type: Boolean, required: true },
            needToRentBoots: { type: Boolean, required: true }

    }]
});

UserSchema.methods.serialize = function () {
    return {
        username: this.username || '',
        firstName: this.firstName || '',
        lastName: this.lastName || '',
        id: this._id || ''
    };
};

UserSchema.methods.validatePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function (password) {
    return bcrypt.hash(password, 10);
};

const User = mongoose.model('User', UserSchema);

module.exports = { User };
