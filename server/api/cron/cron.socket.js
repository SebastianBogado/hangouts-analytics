/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Cron = require('./cron.model');

exports.register = function(socket) {
//  Cron.schema.post('save', function (doc) {
//    onSave(socket, doc);
//  });
//  Cron.schema.post('remove', function (doc) {
//    onRemove(socket, doc);
//  });
};

function onSave(socket, doc, cb) {
  socket.emit('cron:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('cron:remove', doc);
}
