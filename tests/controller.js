var chai = require("chai");
chai.use(require("chai-as-promised"));
var expect = chai.expect
var controller = require('../controller.js');

describe('controller', function () {
    it('post', function () {
        return controller.post({testVal: Date.now(), count: 1})
    });
    it('get', function () {
        return expect(controller.get()).to.eventually.be.an("Number");
    });

});
