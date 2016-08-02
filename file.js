
var fs = require("fs");
var Promise = require('promise');
var path = "data/post.log";
var busyUpdate = null;
/**
 * add json file
 * @param JSON data
 * @param function callback
 */
function addToFile(data) {
    // if this function is performing it will be necessary to link self on current promise 
//    if (busyUpdate !== null) {
//        return new Promise(function (fulfill, reject) {
//            return busyUpdate.then(function () {
//                busyUpdate = null;
//                addToFile(data).then(fulfill).catch(reject);
//            }).catch(reject);
//        });
//    }

    var promise = new Promise(function (fulfill, reject) {
        // always new line
        var newNote = '\n';
        var jsonString = JSON.stringify(data);

        newNote += jsonString;
        
        // string has been created than can leave
        fulfill();
//        busyUpdate = null;
        
        
        // append new line out of of chain
        fs.appendFile(path, newNote, function (err) {
            if (err) {
                return reject(err);
            }
            console.log(data)
//            return fulfill();
        });

    });
    
    return promise;
}
exports.addToFile = addToFile;