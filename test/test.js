var express = require('express')
var app = require('../app')
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var should = require('should');
var request = require('supertest');
var superagent = require('superagent');
var agent = superagent.agent();

describe('start authenticated tests ... ', function () {
	
	before(function (done) {
		//starting server and mongo connection, will get errors otherwise in async calls
		//var req = request(app).get('/');
		
		//req.end(function (err, res) {
		//	if (err) {
		//		console.log(err);
		//	}

		//wait for app to connect to DB before doing anything
	    app.on('dbloaded', function() {
	  		console.log('db is connected');
    		var req = request(app).get('/validate-user/?user=selenium&pass=Memntn12');
			req.end(function(err, res) {
				agent.saveCookies(res);	
				done();
			});
		});
	});
	/*it('logging in and saving cookie ...', function (done) {
		var req = request(app).get('/validate-user/?user=selenium&pass=Memntn12');
		req.end(function(err, res) {
			if (err) {
				console.log(err);
			}
			else {
				agent.saveCookies(res);
				done();
				
			}
		});
	});*/
	//sleep(5000);
	it('visiting own wall ... ', function (done) {
		var req = request(app).get('/');
		agent.attachCookies(req);
		req.expect(200);
		req.end(function (err, res) {
			if (err) {
				console.log(err);
			}
			else {
				done();
			}
		})
	})

	it('posting on own wall ... ', function (done) {
		var req = request(app).post('/post/mocha test message');
		agent.attachCookies(req);
		req.expect(200);
		req.end(function (err, res) {
			if (err) {
				console.log(err);
			}
			done();
		});
	});


	it('posting on friends wall ...', function (done) {
		var req = request(app).post('/post/users/test/mocha test message');
		agent.attachCookies(req);
		req.expect(200);
		req.end(function (err, res) {
			if (err) {
				console.log(err);
			}
			done();
		});
	});

	it('searching for user "test" ... ', function (done) {
		var req = request(app).get('/search/test');
		agent.attachCookies(req);
		req.expect(200);
		req.end(function (err, res) {
			if (err) {
				console.log(err);
			}
			//assert.equal((JSON.parse(res.text)[0].username),'test');
			done();
		});
	});

	it('visiting tests wall ... ', function (done) {
		var req = request(app).get('/users/test');
		agent.attachCookies(req);
		req.expect(200);
		req.end(function (err, res) {
			if (err) {
				console.log(err);
			}
			//console.log(res);
			//console.log(res);
			done();
		});
	});

	it('adding user test as friend ... ', function (done) {
		var req = request(app).post('/users/add/test');
		agent.attachCookies(req);
		//should get redirected to user profile after adding
		req.expect(302);
		req.end(function (err, res) {
			if (err) {
				console.log(err);
			}
			done();
		});
	});
	it('posting on mochas wall ... ', function (done) {
		var req = request(app).post('/post/users/test/mocha test message from user: selenium');
		agent.attachCookies(req);
		req.expect(200);
		req.end(function (err, res) {
			if (err) {
				console.log(err);
			}
			done();
		});
	});

	it('register new user mocha ... ', function (done) {
		data = {user:'mocha', password:'mochatest'};
		request(app).post('/register').type('json').send(data).expect(302).end(function (err, res) {
			if (err) {
				console.log(err);
			}
				done();
		});
	});
});