var mongo = require('mongodb');
var EventEmitter = require('events').EventEmitter;
var dbEmitter = new EventEmitter();

 Mongo = function (host, port) {
	this.db = new mongo.Db('project', new mongo.Server(host, port, {safe: false}, {auto_reconnect: true}, {}));
	this.db.open(function(){
		dbEmitter.emit('dbloaded');
		console.log("DB LOADED LETS MOTHERFUCKING GO");
	});
		
	};

Mongo.prototype.getColl = function (callback) {
	this.db.collection('users', function (err, collection) {
		if (err) {
			callback(err);
		}

		else {
			callback(err, collection);
		}
	});
};

Mongo.prototype.findUser = function (user, callback) {
	this.getColl(function (err, collection) {
		if (err) {
			callback(err);
		}
		else {
			collection.findOne({'username':user}, function(err, result) {
				if (err) {
					callback(err);
				}
				else {
					callback(err, result);
				}
			});
		}
	});
};

Mongo.prototype.findSid = function (sid, callback) {
	this.getColl(function (err, collection) {
		if (err) {
			callback(err);
		}
		else {
			collection.findOne({'sid':sid}, function(err, result) {
				if (err) {
					callback(err);
				}
				else {
					callback(err, result);
				}
			});
		}
	});
};

Mongo.prototype.findId = function (id, callback) {
	this.getColl(function (err, collection) {
		if (err) {
			callback(err);
		}
		else {
			collection.findOne({'_id':id}, function(err, result) {
				if (err) {
					callback(err);
				}
				else {
					callback(err, result);
				}
			});
		}
	});
};

exports.Mongo = Mongo;
