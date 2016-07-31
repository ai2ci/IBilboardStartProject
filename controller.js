

var fileIo = require("./file-io.js");
var dbIo = require("./db-io.js");

function get(fullfill, fail) {

    dbIo.getCount().then(function (count) {
        console.log('c', count);
        fullfill(count);
    }, function (error) {
        fail(error);
    });
}
function post(data, fullfill, fail) {
    fileIo.addToFile(data).then(function () {
        // success
        if (data.count) {
            // increment cout in db
            dbIo.incrementCount(data.count).then(fullfill, fail)
        } else {
        }
    }, fail);
}

exports.get = get
exports.post = post