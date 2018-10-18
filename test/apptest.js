const expect    = require("chai").expect;
//const application = require("../app.js");
const request = require("request");

const port = "9999";

describe("Server running tests", function(){
    it("Check if there is response with status 200 from /echo endpoint", function(done){
        var url = "http://localhost:"+ port + "/echo";
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it("check if there is a response with status 200 for requesting main page: '/'", function(done){
        var url = "http://localhost:"+ port + "/";
        request(url, function(error, response, body){
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it("check if there is a page request with a random url what returns status 404", function(done){
        const crypto = require('crypto');
        var randomString = crypto.randomBytes(10).toString('hex');
        var url = "http://localhost:"+ port + "/" + randomString;
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(404);
            done();
        });
    })
});



