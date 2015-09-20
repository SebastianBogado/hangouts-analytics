'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var SnapshotSchema = new Schema({
  type: String,
  timespan: {
    from: Date,
    to: Date
  },
  ranking: [{
    participantId: Schema.ObjectId,
    photoUrl: String,
    displayName: String,
    totalMessages: Number
  }]
});

SnapshotSchema.index({'timespan.from': 1, 'timespan.to': 1});

module.exports = mongoose.model('Snapshot', SnapshotSchema);
