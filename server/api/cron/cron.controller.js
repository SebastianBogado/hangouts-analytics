'use strict';

var _ = require('lodash');
var Cron = require('./cron.model');

// Get list of crons
exports.index = function(req, res) {
  Cron.find(function (err, crons) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(crons);
  });
};

// Get a single cron
exports.show = function(req, res) {
  Cron.findById(req.params.id, function (err, cron) {
    if(err) { return handleError(res, err); }
    if(!cron) { return res.status(404).send('Not Found'); }
    return res.json(cron);
  });
};

// Creates a new cron in the DB.
exports.create = function(req, res) {
  Cron.create(req.body, function(err, cron) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(cron);
  });
};

// Updates an existing cron in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Cron.findById(req.params.id, function (err, cron) {
    if (err) { return handleError(res, err); }
    if(!cron) { return res.status(404).send('Not Found'); }
    var updated = _.merge(cron, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(cron);
    });
  });
};

// Deletes a cron from the DB.
exports.destroy = function(req, res) {
  Cron.findById(req.params.id, function (err, cron) {
    if(err) { return handleError(res, err); }
    if(!cron) { return res.status(404).send('Not Found'); }
    cron.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}