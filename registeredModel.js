'use strict';

const mongoose = require('mongoose');

// this is our schema to represent a registered track event
const registeredEventSchema = mongoose.Schema({
    trackName: { type: String, required: true },
    eventDate: { type: Date, required: true },
    firstName: { type: String },
    lastName: { type: String },
    needToRentBike: { type: Boolean },
    needToRentHelmet: { type: Boolean },
    needToRentSuit: { type: Boolean },
    needToRentGloves: { type: Boolean },
    needToRentBoots: { type: Boolean }
});

const RegisteredEvent = mongoose.model('RegisteredEvent', registeredEventSchema);

module.exports = { RegisteredEvent };
