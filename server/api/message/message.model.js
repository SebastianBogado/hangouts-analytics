'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MessageSchema = new Schema({
  text: String,
  // Consider an index on timestamp?
  timestamp: Date,
  participantId: { type: Schema.ObjectId, index: true },
  //convId: String
});

module.exports = mongoose.model('Message', MessageSchema);
