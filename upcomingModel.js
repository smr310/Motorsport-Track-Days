'use strict';

const mongoose = require('mongoose');

const upcomingEventSchema = mongoose.Schema({
    trackName: { type: String, required: true },
    eventDate: { type: String, required: true }
});

const UpcomingEvent = mongoose.model('UpcomingEvent', upcomingEventSchema);

module.exports = { UpcomingEvent };
