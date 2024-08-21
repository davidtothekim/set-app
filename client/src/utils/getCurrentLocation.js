// Imports
import axios from 'axios';

async function getCurrentLocation() {
	let response = await axios.get('https://ipapi.co/json');
	let data = await response.data;
	return data;
}

export default getCurrentLocation;
