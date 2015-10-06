'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/crons', function() {

  it('should respond with 404', function(done) {
    request(app)
      .get('/api/crons')
      .expect(404)
      .end(done);
  });
});
