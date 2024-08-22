const express = require('express');
const Server = require('socket.io').Server;
const http = require('http');
const hostname = 'ec2-3-17-28-169.us-east-2.compute.amazonaws.com';

// Create Express app and also allow for app PORT to be optionally specified by an environment variable
const app = express();
const PORT = process.env.PORT || 8001;

const { initializeFirebaseApp } = require('./db/firebase');

// cors package prevents CORS errors when using client side API calls
const cors = require('cors');

// Enable CORS (with additional config options required for cookies)
app.use(
	cors({
		origin: true,
		credentials: true,
		allowedHeaders: [ 'Content-Type', 'Authorization' ]
	})
);

// Require .env files for environment variables (keys and secrets)
require('dotenv').config();

// Enable req.body middleware
app.use(express.json());

// Initialize Firebase
initializeFirebaseApp();

// Routes
const gamesRoute = require('./routes/games');
app.use('/games', gamesRoute);

const path = require('path');

const _dirname = path.dirname('');
const buildPath = path.join(_dirname, '../client/dist');

app.use(express.static(buildPath));

app.get('/*', function(req, res) {
	res.sendFile(path.join(__dirname, '../client/dist/index.html'), function(err) {
		if (err) {
			res.status(500).send(err);
		}
	});
});

app.listen(PORT, hostname, () => {
	// console.log(`🚀 Server listening on port ${PORT}.`);
	console.log(`Server running at http://${hostname}:${port}/`);
});
