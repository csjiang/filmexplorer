'use strict'; 
const express = require('express');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const routes = require('./routes/');
const bodyParser = require('body-parser');

const app = express();

app.engine('html', nunjucks.render);
app.set('view engine', 'html');
nunjucks.configure('views', {noCache: true});

app.use(morgan('tiny'));

app.use(express.static('public'));

app.use(bodyParser.urlencoded());

app.use('/', routes);

app.get('/index.html', function(req, res, next) {
	res.render('index', {}, function(err, html) {
		if (err) {
			console.log(err);
		}
		res.send(html);
	});
});

app.listen(3001, function() {
	console.log('Server listening on port 3001');
});