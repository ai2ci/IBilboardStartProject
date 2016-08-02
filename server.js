
//var express = require("express");
//var app = express();
var http = require('http');
var Promise = require('promise');
var redis = require('redis');
var querystring = require('querystring');

var controller = require('./controller.js');


// copied from http://stackoverflow.com/questions/4295782/how-do-you-extract-post-data-in-node-js
function parsePostData() {
    var instance = this;
    var promise = new Promise(function (fulfill, reject) {
        var queryData = "";

        // on receive data
        instance.on('data', function (data) {
            queryData += data;
            //
            if (queryData.length > 1e6) {
                queryData = "";
                reject('Memory overflow')
            }
        });
        // on end of receiving parse whole string
        instance.on('end', function () {
            // parse query to object
            instance._postDataObject = querystring.parse(queryData);
            fulfill(instance._postDataObject);
        });
        instance.on('error', function (error) {
            reject(error);
        });
    });
    return promise;
}

http.IncomingMessage.prototype.parsePostData = parsePostData;

http.createServer(function (request, response) {
    // function colled on error
    var sendError = function (error) {
        console.log(error, 'err');
        response.writeHead(500);
        response.end('' + error);
    }
    console.log(request.url, request.method);

    // resolve url /count method get
    if (request.url === '/count' && request.method === 'GET') {
        controller.get().then(function (count) {
            // send succes and count
            response.writeHead(200, {"Content-Type": "text/plain"});
            response.end('' + count);
        }).catch(sendError);
    }

    // resolve url /track method post
    else if (request.url === '/track' && request.method === 'POST') {
        // gain object from postdata for next process
        request.parsePostData().then(function (data) {
            return controller.post(data);
        }).then(function () {
              // send succes
              console.log('send success', (request._postDataObject.c || ('count: '+ request._postDataObject.count)));
              response.writeHead(200, {"Content-Type": "text/plain"});
              response.end();
          }).catch(sendError);
    } 
    // resolve the rest of requests
    else {
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.end();
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