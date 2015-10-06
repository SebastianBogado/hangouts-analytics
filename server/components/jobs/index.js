'use strict';

var CronJob = require('cron').CronJob;
var _ = require('lodash');
var Q = require('q');

var Cron = require('../../api/cron/cron.model');

Cron.findQ = Q.nbind(Cron.find, Cron);

var app;

// Singleton. Checks existent crons on start
var cronTab = {
  runCron: runCron,
  runExistentCrons: runExistentCrons,
  getCronStatus: getCronStatus
};

var TZ = process.env.TZ  || 'America/Argentina/Buenos_Aires';

function runCron(cron) {
  // For now, whatever the state is, we can consider it's already running but TODO IMRPOVE
  if (getCronStatus(cron.name))
    return console.warn("Cron %s was already running", cron.name);

  var cronJob = new CronJob(cron.unixExpression, runJob, null, false, TZ, cron),
    startCronJob = _.bind(cronJob.start, cronJob),
    task = require(cron.file);

  function runJob(cron) {
    /*jshint validthis:true */
    cron = cron || this;
    setCronStatus(cron.name, 'running');
    return task(cron)
      .then( function updateRunDates() {
        setCronStatus(cron.name, 'waiting');
        cron.lastRun = new Date();
        cron.nextRun = cronJob.cronTime.sendAt().toDate();

        if (_.isFunction(cron.save)) cron.save();

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
    runJob(cron)
      .then(startCronJob);
  } else {
    startCronJob();
    setCronStatus(cron.name, 'waiting');
    cron.nextRun = cronJob.cronTime.sendAt().toDate();

    if (_.isFunction(cron.save)) cron.save();

    console.log('%s will run on %s', cron.name, cron.nextRun);
  }
}



function runExistentCrons() {
  Cron.findQ()
    .then(function runCrons(crons) {
      _.each(crons, runCron);
    })
    .fail(function logError(err) {
      console.error(err);
    });
}

// TODO IMPROVE isolate this global var
var cronStatus = {};
function getCronStatus(cronName) {
  return cronStatus[cronName];
}
function setCronStatus(cronName, status) {
  cronStatus[cronName] = status;
}

exports = module.exports = function (_app) {
  app = _app;
  cronTab.runExistentCrons();
  return cronTab;
};
