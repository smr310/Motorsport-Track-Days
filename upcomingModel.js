'use strict';

const mongoose = require('mongoose');

const upcomingEventSchema = mongoose.Schema({
    trackName: { type: String, required: true },
    eventDate: { type: Date, required: true }
});

const UpcomingEvent = mongoose.model('UpcomingEvent', upcomingEventSchema);

module.exports = { UpcomingEvent };
