import axios from 'axios';

// let coordinates = {
// 	long: '',
// 	lat: ''
// };

// let coordinates = axios.get('https://ipapi.co/json').then((res) => {
// 	let data = res.data();

//     return let
// 	coordinates.long = data.longitutde;
// 	coordinates.lat = data.latitude;

// });

// export default coordinates;

async function getCurrentLocation() {
	let response = await axios.get('https://ipapi.co/json');
	let data = await response.data;
	return data;
}

export default getCurrentLocation;
