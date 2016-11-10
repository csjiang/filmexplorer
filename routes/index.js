"use strict";
const express = require('express');
const router = express.Router();
const filmBank = require('../filmBank');
const Promise = require ('bluebird');

router.get('/', function (req, res) {
  res.render( 'index', {showForm: true} );
});

router.post('/search', function(req, res) {
	res.redirect('/result/'+ req.body.name);
});

router.get('/result/:name', function(req, res) {
	filmBank.find(req.params.name).then(function(result){
		res.render('index', {movies: result});
		console.log(result);
	});
});

router.get('/result/?genre=', function(req, res) {
	filmBank.find(req.query.genre).then(function(result) {
		res.render('index', {movies: result});
	});
});

router.post('/result', function(req, res) {
	res.redirect('/result');
});

module.exports = router;

// SELECT * 
// FROM (SELECT * FROM movies WHERE name LIKE "%spiderman%") movie
// 	INNER JOIN roles ON roles.movie_id = movie.id 
// 	INNER JOIN actors ON actor_id = actors.id 
// GROUP BY name

// SELECT (first_name || ' ' || last_name) as actor_name, role, name, year, rank FROM actors 
// 	LEFT OUTER JOIN roles ON actor_id = actors.id
// 		LEFT OUTER JOIN movies ON movies.id = movie_id
// 		WHERE name LIKE '%spiderman%'
// 	LEFT OUTER JOIN roles ON roles.movie_id = matchmovie.id
// 	LEFT OUTER JOIN actors ON actor_id = actors.id