const expect = require("chai").expect;
//const application = require("../app.js");
const request = require("request");

const port = "9999";

describe("Server running tests", function(){
    it("Check if there is response with status 200 from '/echo' endpoint", function(done){
        let url = "http://localhost:"+ port + "/echo";
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it("check if there is a response with status 200 for requesting main page: '/'", function(done){
        let url = "http://localhost:"+ port + "/";
        request(url, function(error, response, body){
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it("check if there is a page request with a random url what returns status 404", function(done){
        let crypto = require('crypto');
        let randomString = crypto.randomBytes(10).toString('hex');
        let url = "http://localhost:"+ port + "/" + randomString;
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(404);
            done();
        });
    });
});

describe("Check if there is a main.css file exists", function(){
    it("main.css file can be found", function(done){
        let url = "http://localhost:"+ port + "/main.css";
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
});



