var Client = require('hangupsjs');
var Q = require('q');
var _ = require('underscore');
var app = {};
/**
 * db stored cookies WIP
 * 
var cookiesJson = '{"accounts.google.com":{"/":{"GAPS":{"key":"GAPS","value":"1:8ErsogYTgba1dhaUqqSoX7OAZqW8KA:g8VC1nXmqscmdN54","expires":"2017-09-07T06:20:42.000Z","domain":"accounts.google.com","path":"/","secure":true,"httpOnly":true,"extensions":["Priority=HIGH"],"hostOnly":true,"creation":"2015-09-08T06:20:41.862Z","lastAccessed":"2015-09-08T06:20:42.612Z"},"LSID":{"key":"LSID","value":"DQAAAPsAAABbAJpOia1-816uiTqusgRamnHsn9q7Vte7fEJ3-nE2g4i8E_XFiBsytSie-ZGyatVANVYHmXO1s-UdQ9ZdmODkLGn3cfIj2cMxG6JhMyZQ5ea7JRxW1WjRvNeGFm5IsGsc1Tod7lxSKMUiAUDLmCVmq7hOJ1ll-apAVTr1WxkZUzfjAg1-eN4eqaxAX-v3C1QdHeYq1r3CJWQA2-tp7tZyf11fIUeFyY5tZGgKfIgmv3k-m7ACDwWKgBShZDCY4sCbwyKoBD51mQVO68Al7_4v_WayV6ByFP7ptP1t9RdAXyiEpFRKJheqvxGmZokid6F2MSScHtq6cmjiqbzOVFB4","expires":"2017-09-07T06:20:41.000Z","domain":"accounts.google.com","path":"/","secure":true,"httpOnly":true,"extensions":["Priority=HIGH"],"hostOnly":true,"creation":"2015-09-08T06:20:42.295Z","lastAccessed":"2015-09-08T06:20:42.301Z"},"ACCOUNT_CHOOSER":{"key":"ACCOUNT_CHOOSER","value":"AFx_qI7rXozn0FYbmwITmzMDQxi8aR7WucR1XTiNIpqcpfmMbl07goqD1kAMvSw3M61bOQabKHcN-PYjXON5LmJT9ri0autUneG3BUNaXO0bNZiss2bpnbLD7S0IxbYQOzickgdwVkXj","expires":"2017-09-07T06:20:41.000Z","domain":"accounts.google.com","path":"/","secure":true,"httpOnly":true,"extensions":["Priority=HIGH"],"hostOnly":true,"creation":"2015-09-08T06:20:42.300Z","lastAccessed":"2015-09-08T06:20:42.301Z"}}},"google.com":{"/":{"SID":{"key":"SID","value":"DQAAAPkAAABMDxH5NpAV6XmYFPr10swB0xKkF02PoTNgTAfQGyM9XNy9nn2r3_ZvFLPLOe6gU62zUVALflb57o4tuByfdl0lBmPGAG2x9vGdZj31dUElQ9NqSoYG9gSyq2p66iagXhnsCXQ6VVHMv80uOGgyUWKFtBdYoJRLqQhuZOApxV_XIfR1F7TovZXZG91Cczq00T5OSXJ7i_v__QAKNIaYJaXpF0DGlqT8p2frrG5ZrEyy4BF-BRioIVclFdpO2ROTojYrDDI1xQlqje7IabzSodfURmgp_JBfoTe1Dc_UdJ3rvYPSUgZwu51fNSaF2PBFThJZyss6klRvwOFeM1m5T_fR","expires":"2017-09-07T06:20:41.000Z","domain":"google.com","path":"/","hostOnly":false,"creation":"2015-09-08T06:20:42.294Z","lastAccessed":"2015-09-08T06:20:42.895Z"},"HSID":{"key":"HSID","value":"A1Blz0_U81CThwYNj","expires":"2017-09-07T06:20:41.000Z","domain":"google.com","path":"/","httpOnly":true,"extensions":["Priority=HIGH"],"hostOnly":false,"creation":"2015-09-08T06:20:42.296Z","lastAccessed":"2015-09-08T06:20:42.895Z"},"SSID":{"key":"SSID","value":"Ave6xZ_DmmnTyQnol","expires":"2017-09-07T06:20:41.000Z","domain":"google.com","path":"/","secure":true,"httpOnly":true,"extensions":["Priority=HIGH"],"hostOnly":false,"creation":"2015-09-08T06:20:42.297Z","lastAccessed":"2015-09-08T06:20:42.895Z"},"APISID":{"key":"APISID","value":"22wYGgpUPZ8IDSVb/AJoSTEjgRgKjG5z0A","expires":"2017-09-07T06:20:41.000Z","domain":"google.com","path":"/","extensions":["Priority=HIGH"],"hostOnly":false,"creation":"2015-09-08T06:20:42.298Z","lastAccessed":"2015-09-08T06:20:42.895Z"},"SAPISID":{"key":"SAPISID","value":"hNKWeg6ex_2G-Yqm/ATGhOmSsnNPMf_6iL","expires":"2017-09-07T06:20:41.000Z","domain":"google.com","path":"/","secure":true,"extensions":["Priority=HIGH"],"hostOnly":false,"creation":"2015-09-08T06:20:42.299Z","lastAccessed":"2015-09-08T06:20:42.895Z"},"NID":{"key":"NID","value":"71=hLKnsrtCI-eDBU-13AUpQLR4Wdnzq3fARwv_FTcWuVPv-U_OAMY6Mgbf7qX5kHPS3dU4AnEudR8p9mJiq1oN17S66kPwhSZDfdRiT71YZu4pL6q4xgCjLC3OzB-wUr-U","expires":"2016-03-09T06:20:41.000Z","domain":"google.com","path":"/","httpOnly":true,"hostOnly":false,"creation":"2015-09-08T06:20:42.300Z","lastAccessed":"2015-09-08T06:20:42.895Z"}}},"google.com.ar":{"/":{"PREF":{"key":"PREF","value":"ID=1111111111111111:FF=0:TM=1441693242:LM=1441693242:V=1:S=zKMgxErcK5u81x2k","expires":"2015-12-31T16:02:17.000Z","domain":"google.com.ar","path":"/","hostOnly":false,"creation":"2015-09-08T06:20:42.865Z","lastAccessed":"2015-09-08T06:20:42.865Z"}}},"talkgadget.google.com":{"/":{"S":{"key":"S","value":"talkgadget=QH_QT08gIVgTzIOlxXJ4SA","domain":"talkgadget.google.com","path":"/","secure":true,"httpOnly":true,"hostOnly":true,"creation":"2015-09-08T06:20:43.332Z","lastAccessed":"2015-09-08T06:20:43.332Z"}}}}';
var cookies     = JSON.parse(cookiesJson);

var mongoConnection = {
  connection: 'username:password@mongo-domain/mongo-database',
  collection: 'mongo-collection',
  queryColumn: 'email'
};
var CookieMonster = require('mongo-cookie-monster')(mongoConnection);
var j = new CookieMonster('nytr0gen.george@gmail.com');

var creds = function() {
  return Q().then( function () {
    // Check cookies in db
    return cookies;
  })
    .then( function (cookies) {
      var returnObj = {};

      if (cookies) {
        returnObj.cookies = cookies;
      } else {
        returnObj.auth = _.constant(process.env.HANGOUTS_TOKEN);
        //returnObj.auth = Client.authStdin;
      }

      return returnObj;
    });
};

var client = new Client({
  jarstore: null
});

*/

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
    return client.sendchatmessage(process.env.HANGOUTS_CONV_ID || 'UgyU8IOOS2uslw1tjV54AaABAQ',
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
exports = module.exports = function (_app) {
  app = _app;
  return client;
};
