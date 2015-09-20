'use strict';

var Q = require('q');
var _ = require('lodash');

var Message = require('../../api/message/message.model');
var Participant = require('../../api/participant/participant.model');

Participant.findQ = Q.nbind(Participant.find, Participant);

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

module.exports = function() {
  var to = new Date();
  var from = new Date(to.getTime() - 14*24*60*60*1000);

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

          var snapshot = {
            type: 'daily',
            timespan: {
              from: from,
              to: to
            },
            ranking: _.sortBy(results, 'totalMessages').reverse()
          };

          console.log(snapshot)
        })
        .fail(def.reject);
    });

  return def.promise;
};
