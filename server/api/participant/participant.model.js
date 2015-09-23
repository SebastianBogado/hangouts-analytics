'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GOOGLE_DEFAULT_PHOTO_URL = '//lh6.googleusercontent.com/-Q9v7vFhQOvo/AAAAAAAAAAI/AAAAAAAAAAA/f8l6Kow78cg/s32-c/photo.jpg';

var ParticipantSchema = new Schema({
  firstName: String,
  displayName: String,
  photoUrl: { type: String, default: GOOGLE_DEFAULT_PHOTO_URL, set: setEmptyPhoto },
  totalMessages: { type: Number, default: 0 },
  hangoutsUserId: { type: String, index: { unique: true } }
});

// If the photo comes null or empty string, Mongoose won't set the default value
function setEmptyPhoto(photoUrl) {
  return photoUrl === null || photoUrl === '' ? GOOGLE_DEFAULT_PHOTO_URL : photoUrl;
}

module.exports = mongoose.model('Participant', ParticipantSchema);
