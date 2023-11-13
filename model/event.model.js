const mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
    title: { type: String,  maxlength: 250 },
    details: { type: String, maxlength: 1000 },
    on: { type: Date },
    venue: { type: String, maxlength: 100 },
    registrationLink: { type: String, maxlength: 250 },
});

const Event = mongoose.model('Event', eventSchema);

module.exports=Event;