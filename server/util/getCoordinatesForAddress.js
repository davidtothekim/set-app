require('dotenv').config();
const axios = require('axios');
const querystring = require('node:querystring');

async function getCoordinatesForAddress(address) {
	const response = await axios.get(
		`https://maps.googleapis.com/maps/api/geocode/json?address=${querystring.escape(address)}&key=${process.env
			.GOOGLE_MAPS_API_KEY}`
	);
	const data = response.data;
	const coordinates = data.results[0].geometry.location || null;

	return coordinates;
}

module.exports = getCoordinatesForAddress;
