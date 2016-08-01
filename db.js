
var redis = require("redis");
var Promise = require('promise');
var keyName = 'count';

var busyUpdate = false;


/**
 * increment count
 * @param number data
 * @param Promise
 */
function incrementCount(data) {
    // if this function is processing it's necessary to chain self on current promise
    if (busyUpdate !== false) {
        return new Promise(function (fulfill, reject) {
            return busyUpdate.then(function () {
                incrementCount(data).then(fulfill).catch(reject);
            });
        });
    }

    busyUpdate = new Promise(function (fulfill, reject) {

        var client = redis.createClient();
        client.on('connect', function () {
//            console.log('connected');
            client.get(keyName, function (error, reply) {
                console.log('update', reply, data);
                var value = Number(reply) || 0;
                value += Number(data);
                client.set(keyName, value);
                fulfill(value);
                busyUpdate = false;

            });
        });
        client.on('error', function (error) {
            return reject(error);
        });
    });
    return busyUpdate;
//    return promise;
}
/**
 * 
 * @returns Promise
 */
function getCount() {

    var promise = new Promise(function (fulfill, reject) {

        var client = redis.createClient();
        client.on('connect', function () {
//            console.log('connected');
            client.get(keyName, function (error, reply) {
                var value = Number(reply) || 0;
                fulfill(value);
            });
        });
        client.on('error', function (error) {
            return reject(error);
        });
    });
    return promise;

}

exports.incrementCount = incrementCount;
exports.getCount = getCount;
