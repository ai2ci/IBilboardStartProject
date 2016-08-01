//var http = require('http');
var request = require('supertest');
var chai = require('chai');
chai.use(require("chai-as-promised"));
var expect = chai.expect;

var server = request.agent("http://localhost:8888");

describe('', function () {
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
});
