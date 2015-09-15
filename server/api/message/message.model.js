'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MessageSchema = new Schema({
  text: String,
  timestamp: Date,
  participanId: { type: Schema.ObjectId, index: true },
  //convId: String
});

module.exports = mongoose.model('Message', MessageSchema);
