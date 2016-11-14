// "use strict";

// var fs = require('fs');
// var omdb = require('omdb');
// var Promise = require('bluebird');

// var find = function(moviename) {
// 	return promisifiedFind(moviename).then(function(result) {
// 		return result;
// 	});
//  	// return omdb.search(moviename, function(err, movies) {
// 		// if (err) {
// 		// 	return new Error();
// 		// }
// 		// if (movies.length < 1) {
// 		// 	return console.log('No movies were found!');
// 		// }
// 		// return movies;
// }
// // 	});
// // };

// var promisifiedFind = function(moviename) {
// 	return new Promise(function(resolve, reject) {
// 	 	omdb.search(moviename, function(err, movies) {
// 	 		if (err) {
// 	 			return new Error();
// 	 		}
// 	 		if (movies.length < 1) {
// 	 			return console.log('No movies were found!');
// 	 		}
// 	 		return movies;
// 	 	});
// 	});
// };

// module.exports = {find: find};















