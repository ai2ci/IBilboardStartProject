var controller = require('../controller.js');

describe('controller', function () {
    it('post', function (done) {
        return controller.post({testVal: Date.now(), count: 1}).then(function(){
            done();
        })
    });
    it('get', function (done) {
        return controller.get().then(function(){
            done();
        })
    });

});
