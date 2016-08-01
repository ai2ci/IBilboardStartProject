

var Promise = require('promise');

var fileIo = require("./file.js");
var dbIo = require("./db.js");

function get() {
    var promise = new Promise(function (fulfill, fail) {
        dbIo.getCount().then(function (count) {
            console.log('c', count);
            fulfill(count);
        }).catch(fail);
    });
    return promise;
}
function post(data) {
    var promise = new Promise(function (fulfill, fail) {
        fileIo.addToFile(data).then(function () {
            // success
            if (data.count) {
                // increment cout in db
                dbIo.incrementCount(data.count)
                  .then(fulfill)
                  .catch(fail);
            } else {
                fulfill();
            }
        }, fail);
    });
    return promise;
}

exports.get = get
exports.post = post