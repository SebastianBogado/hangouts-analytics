var CronJob = require('cron').CronJob;
var _ = require('lodash');
var Q = require('q');

var TZ = process.env.TZ  || 'America/Argentina/Buenos_Aires';

var crons = [{
  name: 'dailyMessages',
  description: 'Counts daily messages',
  unixExpression: '0 0 0 * * 2-6',
  file: function() {
    var def = Q.defer();
    def.resolve();
    console.log('You will see this message every second');
    return def.promise;
  }
}, {
  name: 'weeklyMessages',
  description: 'Counts weekly messages',
  unixExpression: '0 0 0 * * 6',
  file: function() {
    var def = Q.defer();
    def.resolve();
    console.log('You will see this message every second');
    return def.promise;
  }
}, {
  name: 'monthlyMessages',
  description: 'Counts monthly messages',
  unixExpression: '0 0 0 1 * *',
  file: function() {
    var def = Q.defer();
    def.resolve();
    console.log('You will see this message every second');
    return def.promise;
  }
}, {
  name: 'yearlyMessages',
  description: 'Counts yearly messages',
  unixExpression: '0 0 0 1 0 *',
  file: function() {
    var def = Q.defer();
    def.resolve();
    console.log('You will see this message every second');
    return def.promise;
  }
}];


_.each(crons, function initCron(cron) {
  var cronJob = new CronJob(cron.unixExpression, runJob, null, false, TZ),
    startCronJob = _.bind(cronJob.start, cronJob);

  function runJob() {
    return cron.file()
      .then( function updateRunDates() {
        cron.lastRun = new Date();
        cron.nextRun = cronJob.cronTime.sendAt();
        console.log('%s finished on %s. Will run again on %s', cron.name, cron.lastRun, cron.nextRun);
      })
      .fail( function handleError(err) {
        console.error('%s threw and error: %s. Retrying.', cron.name, err);
        return runJob();
      });
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


