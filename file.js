
var fs = require("fs");
var Promise = require('promise');
var path = "data/post.log";
/**
 * add json file
 * @param JSON data
 * @param function callback
 */
function addToFile(data) {
    
    var promise = new Promise(function (fulfill, reject) {

        var newNote = '';
        var exists = fs.existsSync(path);
        var jsonString = JSON.stringify(data);
        var date = new Date();

        if (exists) {
            newNote = '\n';
        }
        newNote += date.getTime() + ': ' + jsonString;

        // append new line
        fs.appendFile(path, newNote, function (err, res) {
            if (err) {
                return reject(err);
            }
            return fulfill(res);
        });

    });
    return promise;
}
exports.addToFile = addToFile;