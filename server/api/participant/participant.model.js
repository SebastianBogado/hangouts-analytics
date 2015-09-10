'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GOOGLE_DEFAULT_PHOTO_URL = 'https://lh6.googleusercontent.com/-Q9v7vFhQOvo/AAAAAAAAAAI/AAAAAAAAAAA/f8l6Kow78cg/s32-c/photo.jpg';

var ParticipantSchema = new Schema({
  firstName: String,
  displayName: String,
  photoUrl: { type: String, default: GOOGLE_DEFAULT_PHOTO_URL },
  totalMessages: { type: Number, default: 0 },
  hangoutsUserId: { type: String, index: { unique: true } }
});

module.exports = mongoose.model('Participant', ParticipantSchema);
