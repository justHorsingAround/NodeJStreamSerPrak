const expect    = require("chai").expect;
//const application = require("../app.js");
const request = require("request");

const port = "9999";

describe("Server running test", function(){
    it("Check if there is response with status 200 from /echo endpoint", function(done){
        var url = "http://localhost:"+ port + "/echo";
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
});

//as


