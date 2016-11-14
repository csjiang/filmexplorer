"use strict";
const express = require('express');
const router = express.Router();
const filmBank = require('../filmBank');
const imdb = require('imdb-api');
const omdb = require('omdb');
const Promise = require ('bluebird');

router.get('/', function (req, res) {
  res.render('index', {showForm: true} );
});

router.post('/search', function(req, res) {
	res.redirect('/result/'+ req.body.name);
});

router.get('/result/:name', function(req, res) {
	omdb.search(req.params.name, function(err, movies) {
 		if (err) {
 			return new Error();
 		}
 		if (movies.length < 1) {
 			return console.log('No movies were found!');
 		}
		res.render('index', {movies: movies});
	});
});

router.get('/result/film/:movieName/:movieId', function(req, res, next) {
	omdb.get(req.params.movieId, {
		fullPlot: true,
		tomatoes: true
	}, function(err, movie) {
		if (err) {
			return console.err(err);
		} 
		if(!movie) {
			return console.log('Movie not found!');
		}
		res.render('filmpage', {movie: movie});
	});
});

// router.get('/result/', function(req, res, next) {
// 	omdb.search({
// 		terms: '', 
// 		year: req.query.year}, function(err, movies) {
//  		if (err) {
//  			return new Error();
//  		}
//  		if (movies.length < 1) {
//  			return console.log('No movies were found!');
//  		}
// 		res.render('index', {movies: movies});
// 	});
// });

//in-progress
router.get('/result/?genre=', function(req, res) {
	filmBank.find(req.query.genre).then(function(result) {
		res.render('index', {movies: result});
	});
});

router.post('/result', function(req, res) {
	res.redirect('/result');
});

module.exports = router;