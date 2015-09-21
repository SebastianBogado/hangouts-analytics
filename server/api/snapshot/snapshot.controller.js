'use strict';

var _ = require('lodash');
var Snapshot = require('./snapshot.model');

// Get list of snapshots
exports.index = function(req, res) {
  Snapshot.find(function (err, snapshots) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(snapshots);
  });
};

// Get a single snapshot
exports.show = function(req, res) {
  Snapshot.findById(req.params.id, function (err, snapshot) {
    if(err) { return handleError(res, err); }
    if(!snapshot) { return res.status(404).send('Not Found'); }
    return res.json(snapshot);
  });
};

// Creates a new snapshot in the DB.
exports.create = function(req, res) {
  Snapshot.create(req.body, function(err, snapshot) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(snapshot);
  });
};

// Updates an existing snapshot in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Snapshot.findById(req.params.id, function (err, snapshot) {
    if (err) { return handleError(res, err); }
    if(!snapshot) { return res.status(404).send('Not Found'); }
    var updated = _.merge(snapshot, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(snapshot);
    });
  });
};

// Deletes a snapshot from the DB.
exports.destroy = function(req, res) {
  Snapshot.findById(req.params.id, function (err, snapshot) {
    if(err) { return handleError(res, err); }
    if(!snapshot) { return res.status(404).send('Not Found'); }
    snapshot.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}