

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
    var promise1 = new Promise(function (fulfill, fail) {
        file.addToFile(data).then(fulfill, fail);
    });
    var promise2 = new Promise(function (fulfill, fail) {
        if (data.count) {
            // increment cout in db
            db.incrementCount(data.count)
              .then(fulfill)
              .catch(fail);
        } else {
            fulfill();
        }
    });
    return new Promise.all([promise1, promise2]);
}

exports.get = get
exports.post = post