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