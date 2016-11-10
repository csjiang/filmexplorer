"use strict";

var fs = require('fs');
var Promise = require('bluebird');
var file = 'imdb-large.sqlite3.db';
var exists = fs.existsSync(file);

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(file);

var find = function(moviename) {
	return promisifiedFind(moviename).then(function(result) {
		return result;
	});
};

var promisifiedFind = function(moviename) {
	return new Promise(function(resolve, reject) {
		db.all('SELECT * FROM movies WHERE name LIKE "%' + moviename + '%"', function(err, rows) {
			if(err) {
				reject(err);
			} else {
				let result = [];
				rows.forEach(function(row) {
					result.push({name: row.name, year: row.year, ID: row.id, rank: row.rank});
				});
				resolve(result);
			}
		});
	});
};

module.exports = {find: find};















