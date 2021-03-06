//var http = require('http');
var request = require('supertest');
var chai = require('chai');
chai.use(require("chai-as-promised"));
var expect = chai.expect;

var server = request.agent("http://localhost:8888");

describe('server', function () {
    it('GET / should be 404', function (done) {
        server
          .get('')
          .expect(404)
          .expect('Content-Type', /text\/plain/)
          .end(function (err, res) {
              if (err) {
                  done(err);
              }
              expect(res.text).to.be.empty;
              done();
          });
    });
    it('POST /track should be 200', function (done) {
        server
          .post('/track')
//          .send({ count: '1', other: 'cat' })
          .expect(200)
          .expect('Content-Type', /text\/plain/)
          .end(function (err, res) {
              if (err) {
                  return done(err);
              }
              done();
          });
    });
    it('GET /count should be 200', function (done) {
        server
          .get('/count')
          .expect(200)
          .expect('Content-Type', /text\/plain/)
          .end(function (err, res) {
              if (err) {
                  done(err);
              }
              expect(res.text).to.be.an('String');
              done();
          });
    });

});
