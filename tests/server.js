//var http = require('http');
var request = require('supertest');
var chai = require('chai');
chai.use(require("chai-as-promised"));
var expect = chai.expect;

var server = request.agent("http://localhost:8888");

describe('server response', function () {
    it('GET /count should be 200 and not empty', function (done) {
        server
          .get('/count')
          .expect(200)
          .expect('Content-Type', /text\/plain/)
          .end(function (err, res) {
              if (err) {
                  done(err);
              }
              expect(res.text).to.not.be.empty;
              done();
          });
    });

    it('GET /track should be 404 ', function (done) {
        server
          .get('/track')
          .expect(404)
          .expect('Content-Type', /text\/plain/)
          .end(function (err, res) {
              if (err) {
                  done(err);
              }
              done();
          });
    });
    it('POST /count should be 404 ', function (done) {
        server
          .post('/count')
          .expect(404)
          .expect('Content-Type', /text\/plain/)
          .end(function (err, res) {
              if (err) {
                  done(err);
              }
              done();
          });
    });
    it('POST /track should be 200 and empty ', function (done) {
        server
          .post('/track')
          .expect(200)
          .expect('Content-Type', /text\/plain/)
          .end(function (err, res) {
              if (err) {
                  done(err);
              }
              expect(res.text).to.be.empty;
              done();
          });
    });

});
