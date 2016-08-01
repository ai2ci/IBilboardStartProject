

var Promise = require('promise');

var fileIo = require("./file-io.js");
var dbIo = require("./db-io.js");

function get() {
    var promise = new Promise(function (fullfill, fail) {
        dbIo.getCount().then(function (count) {
            console.log('c', count);
            fullfill(count);
        }).catch(fail);
    });
    return promise;
}
function post(data) {
    var promise = new Promise(function (fullfill, fail) {
        fileIo.addToFile(data).then(function () {
            // success
            if (data.count) {
                // increment cout in db
                dbIo.incrementCount(data.count)
                  .then(fullfill)
                  .catch(fail);
            } else {
                fullfill();
            }
        }, fail);
    });
    return promise;
}

exports.get = get
exports.post = post