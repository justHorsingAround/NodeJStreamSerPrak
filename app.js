const fs = require('fs');
const path = require('path');
var dateTime = require('node-datetime');
const express = require('express');
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 9999;

app.use(express.static(path.join(__dirname, 'static')));

app.get('/echo', function(req, resp){
    var currentTime = dateTime.create().format('Y-m-d H:M:S');
    resp.status(200);
    resp.send("The server responded at: " + currentTime);
    nofun();

})

if(!module.parent){
    app.listen(port, function(){
        console.log("Server is running, port:", port);
    });
}


