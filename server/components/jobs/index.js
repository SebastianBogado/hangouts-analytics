'use strict';

var CronJob = require('cron').CronJob;
var _ = require('lodash');
var Q = require('q');

var app;
var TZ = process.env.TZ  || 'America/Argentina/Buenos_Aires';

var crons = [{
  name: 'dailyMessages',
  description: 'Counts daily messages',
  unixExpression: '0 0 0 * * 2-6',
  file: './snapshot.daily',nextRun: new Date() -1
}, {
  name: 'weeklyMessages',
  description: 'Counts weekly messages',
  unixExpression: '0 0 0 * * 6',
  file: './snapshot.daily'
}, {
  name: 'monthlyMessages',
  description: 'Counts monthly messages',
  unixExpression: '0 0 0 1 * *',
  file: './snapshot.daily'
}, {
  name: 'yearlyMessages',
  description: 'Counts yearly messages',
  unixExpression: '0 0 0 1 0 *',
  file: './snapshot.daily'
}];


_.each(crons, function initCron(cron) {
  var cronJob = new CronJob(cron.unixExpression, runJob, null, false, TZ),
    startCronJob = _.bind(cronJob.start, cronJob),
    task = require(cron.file);

  function runJob() {
    return task()
      .then( function updateRunDates() {
        cron.lastRun = new Date();
        cron.nextRun = cronJob.cronTime.sendAt();
        console.log('%s finished on %s. Will run again on %s', cron.name, cron.lastRun, cron.nextRun);
      })
      .fail( function handleError(err) {
        console.error('%s threw an error: %s. Retrying in 60 seconds.', cron.name, err);
        setTimeout(runJob, 60*1000)
      })
  }

  // Job should have run already. Maybe the app was off at that time
  if (cron.nextRun < new Date()) {
    console.log('%s will run now', cron.name);
    runJob()
      .then(startCronJob);
  } else {
    startCronJob();
    cron.nextRun = cronJob.cronTime.sendAt();
    console.log('%s will run on %s', cron.name, cron.nextRun);
  }
});




exports = module.exports = function (_app) {
  app = _app;
};
