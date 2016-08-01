var chai = require("chai");
chai.use(require("chai-as-promised"));
var expect = chai.expect
var db = require('../file.js');


describe('file', function () {
    it('addToFile', function () {
        return db.addToFile({'testing': Date.now()});
    });

});
