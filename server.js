
//var express = require("express");
//var app = express();
//var app = express();
var http = require('http');
var Promise = require('promise');
var redis = require('redis');
var querystring = require('querystring');

var controller = require('./controller.js');


// copied from http://stackoverflow.com/questions/4295782/how-do-you-extract-post-data-in-node-js
function processPost() {
    var instance = this;
    var promise = new Promise(function (fullfill, reject) {
        var queryData = "";
        instance.on('data', function (data) {

            queryData += data;
            if (queryData.length > 1e6) {
                queryData = "";
                reject('Memory overflow')
            }
        });
        instance.on('end', function () {
            instance.postDataObject = querystring.parse(queryData);
            
            fullfill(instance.postDataObject);
        });
    });
    return promise;
}

http.IncomingMessage.prototype.processPost = processPost;

http.createServer(function (request, response) {
    var sendError = function (error) {
        console.log(error, 'err');
        response.writeHead(500);
        response.end();
    }
    console.log(request.url, request.method);
    // resolve url /count method get
    if (request.url === '/count' && request.method === 'GET') {
        controller.get(function (count) {
            response.writeHead(200, {"Content-Type": "text/plain"});
            response.end(''+count);
        }, sendError);
    }
    // resolve url /track method post
    if (request.url === '/track' && request.method === 'POST') {
        // gain object from postdata for next process
        request.processPost().done(function (data) {
            controller.post(data, function () {
                console.log('send success');
                response.writeHead(200, {"Content-Type": "text/plain"});
                response.end();
            }, sendError)

        }, sendError);
    }

}).listen(8888);


//app.get('/count', function (request, response) {
//    controller.get(function (count) {
//        console.log('s', count);
//        
//        response.send('' + count);
//    }, function () {
//        response.sendStatus(500);
//    });
//})
//app.post('/track', function (request, response) {
//    console.log(request.params,'s');
//    controller.post(request.params, function () {
//        response.sendStatus(200);
//    }, function () {
//        response.sendStatus(500);
//    });
//
//})
//
//app.listen(8888, function () {
//    console.log('Th app is listening on the port 8888!');
//});