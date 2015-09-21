'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CronSchema = new Schema({
  name: String,
  description: String,
  unixExpression: String,
  file: String,
  lastRun: Date,
  nextRun: Date,
  // Any extra information that the job may need will be here
  jobContext: {}
});

module.exports = mongoose.model('Cron', CronSchema);
