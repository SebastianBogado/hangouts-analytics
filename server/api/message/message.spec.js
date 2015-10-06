'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/messages', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/messages')
      .expect(404)
      .end(done);
  });
});
