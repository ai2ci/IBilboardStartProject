var chai = require("chai");
chai.use(require("chai-as-promised"));
var expect = chai.expect
var db = require('../db.js');


describe('db', function () {
    it('incrementCount', function () {
        return expect(db.incrementCount(1)).to.eventually.be.an("Number");
    });
    it('getCount', function () {
        return expect(db.getCount()).to.eventually.be.an("Number");
    });

});
