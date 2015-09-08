var Client = require('hangupsjs');
var Q = require('q');
var _ = require('underscore');

// callback to get promise for creds using stdin. this in turn
// means the user must fire up their browser and get the
// requested token.
var creds = function() {
  console.log('TOKEN URL: ', Client.OAUTH2_LOGIN_URL);
  return {
    auth: _.constant(process.env.HANGOUTS_TOKEN)
    //auth: Client.authStdin
  };
};

var client = new Client();

// set more verbose logging
client.loglevel('debug');

// receive chat message events
client.on('chat_message', function(ev) {
  var convId = ev.conversation_id.id;
  var userId = ev.sender_id.chat_id;
  var chatMessage = _.pluck(ev.chat_message.message_content.segment, 'text').join('');
  var timestamp = ev.timestamp;
  //console.log(ev);
  client.getentitybyid([userId])
    .then( function (response) {
      var userProperties = response.entities[0].properties;
      var userName = userProperties.display_name;
      var photoUrl = userProperties.photo_url;
      console.log('convId: ', convId);
      console.log('userId: ', userId, ', name: ', userName);
      console.log('timestamp: ', timestamp);
      console.log('chatMessage: ', chatMessage);
    })
    .fail(function (err) {
      console.error(err);
    })
    .done();
});


var reconnect = function() {
  client.connect(creds).then(function() {
    //return client.sendchatmessage(process.env.HANGOUTS_CONV_ID,
    return client.sendchatmessage('UgyU8IOOS2uslw1tjV54AaABAQ',
      [[0, 'gg']]);
  }).done();
};

// whenever it fails, we try again
client.on('connect_failed', function() {
  Q.Promise(function(rs) {
    console.info('connect_failed event. Retrying in 60 seconds');
    // backoff for 60 seconds
    setTimeout(rs, 60000);
  }).then(reconnect);
});

// start connection
reconnect();

// Expose client
exports = module.exports = client;
