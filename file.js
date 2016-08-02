
var fs = require("fs");
var Promise = require('promise');
var path = "data/post.log";
/**
 * add object like json to file
 * @param Object data
 * @returns Promise
 */
function addToFile(data) {
    var promise = new Promise(function (fulfill, reject) {
        // always new line
        var newNote = '\n';
        var jsonString = JSON.stringify(data);

        newNote += jsonString;
        
        // string has been created than can leave
        fulfill();
        
        // append new line out of of chain
        fs.appendFile(path, newNote, function (err) {
            if (err) {
                return reject(err);
            }
            console.log(data)
        });

    });
    
    return promise;
}
exports.addToFile = addToFile;
