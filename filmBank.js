"use strict";

var fs = require('fs');
var Promise = require('bluebird');
var file = 'imdb-large.sqlite3.db';
var exists = fs.existsSync(file);

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(file);

// db.serialize(function() {

// });

// db.close();

//perform SELECT operation
// db.all('SELECT * FROM movies WHERE name =' + moviename, function(err, rows) {
// 	if(err) {
// 		console.log('Error');
// 	} 

// })
// function find(moviename){
// 	db.all('SELECT * FROM movies WHERE name LIKE "%' + moviename + '%"', function(err, rows) {
// 		if(err) {
// 			console.log('Error');
// 		} 
// 		rows.forEach(function(row) {
// 			result.push({name: row.name, year: row.year, ID: row.id, rank: row.rank});
// 			});
// 		// console.log("in F.js"+ result);
// 		// return result;
// 	});
// 	setTimeOut(function() {
// 		return result;
// 	}, 2000)
// };

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















