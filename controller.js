

var Promise = require('promise');

var file = require("./file.js");
var db = require("./db.js");

function get() {
    var promise = new Promise(function (fulfill, fail) {
        db.getCount().then(function (count) {
            console.log('c', count);
            fulfill(count);
        }).catch(fail);
    });
    return promise;
}
function post(data) {
    var promise = new Promise(function (fulfill, fail) {
        file.addToFile(data).then(function () {
            // success
            if (data.count) {
                // increment cout in db
                db.incrementCount(data.count)
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