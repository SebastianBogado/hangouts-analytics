'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ParticipantSchema = new Schema({
  firstName: String,
  displayName: String,
  photoUrl: String,
  totalMessages: { type: Number, default: 0 },
  hangoutsUserId: { type: String, index: { unique: true } }
});

module.exports = mongoose.model('Participant', ParticipantSchema);
