var Client = require('hangupsjs');
var Q = require('q');
var _ = require('underscore');

// callback to get promise for creds using stdin. this in turn
// means the user must fire up their browser and get the
// requested token.
var creds = function() {
  return {
    auth: process.env.HANGOUTS_TOKEN
  };
};

var client = new Client();

// set more verbose logging
client.loglevel('debug');

// receive chat message events
client.on('chat_message', function(ev) {
  var convId = ev.conversation_id.id;
  var userId = ev.sender_id.gaia_id;
  var chatMessage = _.pluck(ev.chat_message.message_content.segment, 'text').join('');
  var timestamp = ev.timestamp;
  console.log(ev);
  console.log('convId: ', convId);
  console.log('userId: ', userId);
  console.log('timestamp: ', timestamp);
  console.log('chatMessage: ', chatMessage);
  return;
});

// connect and post a message.
// the id is a conversation id.
client.connect(creds).then(function() {
  return client.sendchatmessage('UgyGaOKODAq2G21X2QV4AaABAQ',
    [[0, 'Hello World']]);
}).done();

// Expose client
exports = module.exports = client;
