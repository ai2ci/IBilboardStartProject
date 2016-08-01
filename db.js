
var redis = require("redis");
var Promise = require('promise');
var keyName = 'count';


/**
 * increment count
 * @param number data
 * @param Promise
 */
function incrementCount(data) {

    var promise = new Promise(function (fulfill, reject) {

        var client = redis.createClient();
        client.on('connect', function () {
            console.log('connected');
            client.get(keyName, function (error, reply) {
                console.log(1,reply, data);
                var value = Number(reply) || 0;
                value += Number(data);
                client.set(keyName, value);
                fulfill(value);
            });
        });
        client.on('error', function (error) {
            return reject(error);
        });
    });
    return promise;
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
            console.log('connected');
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
