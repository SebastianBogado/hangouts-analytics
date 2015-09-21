'use strict';

var Q = require('q');
var _ = require('lodash');
var moment = require('moment');

var Message = require('../../api/message/message.model');
var Participant = require('../../api/participant/participant.model');
var Snapshot = require('../../api/snapshot/snapshot.model');

Participant.findQ = Q.nbind(Participant.find, Participant);

var typeSustracts = {
  daily: 'days',
  weekly: 'weeks',
  monthly: 'months',
  yearly: 'years'
};

function populateResultsWithParticipants(results) {
  return function (participants) {
    var populatedResults = [];

    _.each(results, function (result) {
      var participant = _.findWhere(participants, {_id: result._id});

      if (!participant) return console.warn("Participant with id %s not found, but has messages", result._id);

      populatedResults.push({
        particinantId: participant._id,
        photoUrl: participant.photoUrl,
        displayName: participant.displayName,
        totalMessages: result.totalMessages
      });
    });

    return populatedResults;
  }
}

module.exports = function (snapshotType) {
  if (!typeSustracts[snapshotType]) return console.error('Unknown snapshot type: %s', snapshotType);

  return function(cron) {
    var to = cron.nextRun;
    var from = moment(to).subtract(1, typeSustracts[snapshotType]).toDate();

    var def = Q.defer();

    // Model.exec already returns a promise but its API differs from kriskowal's
    Message
      .aggregate()
      .match( {timestamp: { $lt: to, $gte: from}})
      .project( 'participantId -_id')
      .group({_id: "$participantId", totalMessages: {$sum: 1}})
      .allowDiskUse(true)
      .exec( function execAggregation(err, results) {
        if (err) return def.reject(err);

        var participants = _.pluck(results, '_id');

        return Participant.findQ({_id: {$in: participants}}, 'displayName photoUrl', {lean: true})
          .then(populateResultsWithParticipants(results))
          .then( function saveSnapshot(results) {

            var snapshot = new Snapshot({
              type: snapshotType,
              timespan: {
                from: from,
                to: to
              },
              ranking: _.sortBy(results, 'totalMessages').reverse()
            });

            return Q.nfcall(snapshot.save)
              .then(_.constant(snapshot));
          })
          .then( function logStuff(snapshot) {
            console.log("Snapshot type %s from %s to %s saved.", snapshot.type, snapshot.timespan.from, snapshot.timespan.to);
            def.resolve();
          })
          .fail(def.reject);
      });

    return def.promise;
  }
};
