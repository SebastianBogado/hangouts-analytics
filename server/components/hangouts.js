'use strict';

var Client = require('hangupsjs');
var Q = require('q');
var _ = require('underscore');
var app = {};
var config = require('../config/environment');


//TODO, improve fucking relative paths
// Maybe this https://gist.github.com/branneman/8048520
// or this https://lostechies.com/derickbailey/2014/02/20/how-i-work-around-the-require-problem-in-nodejs/
var Participant = require('../api/participant/participant.model');
var Message = require('../api/message/message.model');

// TODO maybe mongoose-q package to avoid manual q binds?
Participant.findOneQ = Q.nbind(Participant.findOne, Participant);
Participant.updateQ = Q.nbind(Participant.update, Participant);


var mongoConnection = {
  connection: config.mongo.uri,
  collection: 'cookies',
  queryColumn: 'email'
};
var CookieMonster = require('mongo-cookie-monster')(mongoConnection);
var jarstore = new CookieMonster(process.env.GMAIL_ACCOUNT);


var creds = function() {
  console.log('TOKEN URL: ', Client.OAUTH2_LOGIN_URL);
  return {
    auth: _.constant(process.env.HANGOUTS_TOKEN)
    //auth: Client.authStdin
  };
};

var client = new Client({
  jarstore: jarstore
});

// set more verbose logging
client.loglevel('info');

// receive chat message events
client.on('chat_message', function(ev) {
  var convId = ev.conversation_id.id;

  // Work only with the conversation set as env var
  if (convId !== process.env.HANGOUTS_CONV_ID) return;

  var userId = ev.sender_id.chat_id;
  var chatMessage = _.pluck(ev.chat_message.message_content.segment, 'text').join('');
  var timestamp = ev.timestamp / 1000; // Timestamp is in microseconds >.<
  var userName = '';


  Participant.findOneQ({hangoutsUserId: userId}, '_id displayName')
    .then( function getParticipant(participant) {
      if (participant) {
        userName = participant.displayName;
        return participant;
      } else {
        return client.getentitybyid([userId])
          .then( function (response) {
            var userProperties = response.entities[0].properties;

            var participant = new Participant({
              firstName: userProperties.first_name,
              displayName: userName = userProperties.display_name,
              photoUrl: userProperties.photo_url,
              hangoutsUserId: userId
            });

            return Q.nfcall(participant.save)
              .then(_.constant(participant));
          });
        }
      })
    .then( function saveMessage(participant) {

      var message = new Message({
        text: chatMessage,
        timestamp: timestamp,
        participantId: participant._id
      });

      return Q.nfcall(message.save);
    })
    .then( function updateParticipantsTotalMessages() {
      // TODO using atomic update like below is way MOAR performant
      //return Participant.updateQ({ hangoutsUserId: userId }, { $inc: { totalMessages: 1 }});
      // TODO IMPROVE finding the participant in db just so that the update triggers an event? faaaaaaaail
      return Participant.findOneQ({ hangoutsUserId: userId })
        .then(function (participant) {
          participant.totalMessages++;
          participant.save();
        });
    })
    .then( function logStuff() {
      console.log("%s said [%s]: %s", userName, new Date(timestamp), chatMessage);
    })
    .fail(function (err) {
      console.error(err);
    })
    .done();
});


var reconnect = function() {
  return client.connect(creds).then(function() {
    console.log('Connected to hangouts. Shydino approves.');
    //return client.sendchatmessage(process.env.HANGOUTS_CONV_ID || 'UgyU8IOOS2uslw1tjV54AaABAQ',
    //  [[0, 'gg']]);
  });
};

// whenever it fails, we try again
client.on('connect_failed', function() {
  Q.Promise(function(rs) {
    console.info('connect_failed event. Retrying in 60 seconds');
    // backoff for 60 seconds
    setTimeout(rs, 60000);
  })
    .then(reconnect)
    .fail( function (err) {
      console.error("Unexpected error while reconnecting. Retrying in 60 seconds", err);
    })
    .done();
});

// start connection
reconnect();

// Expose client
exports = module.exports = function (_app) {
  app = _app;
  return client;
};
