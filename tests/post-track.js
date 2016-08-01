//var http = require('http');
var request = require('supertest');
var chai = require('chai');
chai.use(require("chai-as-promised"));
var expect = chai.expect;

var server = request.agent("http://localhost:8888");

describe('POST /track ', function () {
    it('should be 200', function (done) {
        server
          .post('/track')
          .send({ count: '1', other: 'cat' })
          .expect(200)
          .expect('Content-Type', /text\/plain/)
          .end(function (err, res) {
              if (err) {
                  done(err);
              }
              done();
          });
    });
    

});
