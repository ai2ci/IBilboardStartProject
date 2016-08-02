
var redis = require("redis");
var Promise = require('promise');
var keyName = 'count';

var busyUpdate = null;

var client = null;

/**
 * increment count
 * @param number data
 */
function incrementCount(data) {
    // if this function is performing it will be necessary to link self on current promise
    if (busyUpdate !== null) {
        return new Promise(function (fulfill, reject) {
            return busyUpdate.then(function () {
                incrementCount(data).then(fulfill).catch(reject);
            }).catch(reject);
        });
    }

    busyUpdate = new Promise(function (fulfill, reject) {


        client = redis.createClient();

        client.on('error', function (error) {
            client = null;
            reject(error);
            busyUpdate = null;
        });
        //on connect get value and save new count
        client.on('connect', function () {
            client.get(keyName, function (error, reply) {
                console.log('update', reply, data);

                var value = Number(reply) || 0;
                value += Number(data);
                client.set(keyName, value);

                fulfill(value);
                busyUpdate = null;
                client.quit();

            });
        });
    });
    return busyUpdate;
}
/**
 * 
 * @returns Promise
 */
function getCount() {
    var promise = new Promise(function (fulfill, reject) {

        client = redis.createClient();

        client.on('error', function (error) {
            client = null;
            reject(error);
            busyUpdate = null;
        });
        //on connect get value 
        client.on('connect', function () {
            client.get(keyName, function (error, reply) {
                var value = Number(reply) || 0;

                fulfill(value);
                busyUpdate = null;
                client.quit();

            });
        }); 
    });
    return promise;

}

exports.incrementCount = incrementCount;
exports.getCount = getCount;
