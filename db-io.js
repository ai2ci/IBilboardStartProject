
var redis = require("redis");
var Promise = require('promise');
var keyName = 'count';


/**
 * increment count
 * @param number data
 * @param Promise
 */
function incrementCount(data) {

    var promise = new Promise(function (fullfill, reject) {


        var client = redis.createClient();
        client.on('connect', function () {
            console.log('connected');
            client.get(keyName, function (error, reply) {
                console.log(1,reply);
                var value = Number(reply) || 0;
                value += Number(data);
                client.set(keyName, value);
                console.log(2,value)
                fullfill(value);
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

    var promise = new Promise(function (fullfill, reject) {

        var client = redis.createClient();
        client.on('connect', function () {
            console.log('connected');
            client.get(keyName, function (error, reply) {
                var value = Number(reply) || 0;
                fullfill(value);
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