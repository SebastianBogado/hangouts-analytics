'use strict';

var Q = require('q');


module.exports = function(cron, app) {
  var client = app.client;

  return client.sendchatmessage(process.env.HANGOUTS_CONV_ID || 'UgyU8IOOS2uslw1tjV54AaABAQ',
    [[0, 'Bebitos, pintó el Año Nuevo']])
    .then( function () {
      return client.sendchatmessage(process.env.HANGOUTS_CONV_ID || 'UgyU8IOOS2uslw1tjV54AaABAQ',
        [[0, 'Por otro año lleno de picanteadas, frascos, Macs, fails, fracasos laborales, quintas fallidas y un par ingenieros más en LGD!']])
    })
    .then( function () {
      return client.sendchatmessage(process.env.HANGOUTS_CONV_ID || 'UgyU8IOOS2uslw1tjV54AaABAQ',
        [[0, 'Ahora sí, tabla de posiciones Peter!']])
    })
    .then( function () {
      return client.sendchatmessage(process.env.HANGOUTS_CONV_ID || 'UgyU8IOOS2uslw1tjV54AaABAQ',
        [[0, 'Primero blonpa, era obvio, con 13949 mensajes. Seguido lejos por FerP con 11758. Rozando los 10k, nppppppppppp. Mención de honor Tom, con 9013 mensajes']])
    })
    .then( function () {
      return client.sendchatmessage(process.env.HANGOUTS_CONV_ID || 'UgyU8IOOS2uslw1tjV54AaABAQ',
        [[0, 'Negro, preparate porque se te termina la joda con AleM de jefe... NOT (cómo mierda meto emoticones acá?!)']])
    })
    .then( function () {
      return client.sendchatmessage(process.env.HANGOUTS_CONV_ID || 'UgyU8IOOS2uslw1tjV54AaABAQ',
        [[0, 'ninos']])
    });
};
