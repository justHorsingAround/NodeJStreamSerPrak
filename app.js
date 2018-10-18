var cluster = require('cluster');

if (cluster.isMaster) {
    var cpuCount = require('os').cpus().length;

    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }
    cluster.on('exit', function (worker) {
        console.log('Worker ' + worker.id + ' died :(');
        cluster.fork();
    });

// Code to run if we're in a worker process
} else {
    const AWS = require('aws-sdk');
    var bodyParser = require('body-parser');

    AWS.config.region = process.env.REGION

    const sns = new AWS.SNS();
    var snsTopic =  process.env.NEW_SIGNUP_TOPIC;

    const fs = require('fs');
    const path = require('path');
    const dateTime = require('node-datetime');
    const express = require('express');
    var app = express();

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    const port = process.env.PORT || 9999;

    app.use(express.static(path.join(__dirname, 'static')));



    app.get('/echo', function(req, resp){
        var currentTime = dateTime.create().format('Y-m-d H:M:S');
        resp.status(200);
        resp.send("The server responded at: " + currentTime);
    })

    app.get('/', function(req, resp){
        fs.readFile('index.html', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        });
    });

    if(!module.parent){
        app.listen(port, function(){
            console.log("Server process started, id:" + cluster.worker.id);
        });
    }
}


