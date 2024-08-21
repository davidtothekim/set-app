const express = require('express');
const router = express.Router();

require('dotenv').config();

const { getFirestore, collection, getDocs, query, where, doc, setDoc } = require('firebase/firestore');
const getCoordinatesForAddress = require('../util/getCoordinatesForAddress');

let db = getFirestore();

// GET all games
router.get('/', async (req, res) => {
	const gamesRef = collection(db, 'AllGames');
	const q = query(gamesRef);

	const docSnap = await getDocs(q);

	let games = docSnap.docs.map(async (doc) => {
		let game = doc.data();

		let promise = getCoordinatesForAddress(game.address);

		await promise.then((coordinates) => {
			game['lat'] = coordinates.lat;
			game['lng'] = coordinates.lng;
		});
		return game;
	});

	Promise.all(games).then((gamesData) => res.send(gamesData));
});

// GET details of a specific game by id
router.get('/:gameId', async (req, res) => {
	const gamesRef = collection(db, 'AllGames');
	const finalData = [];
	const q = query(gamesRef, where('game_id', '==', req.params.gameId));

	const docSnap = await getDocs(q);

	docSnap.forEach((doc) => {
		finalData.push(doc.data());
	});

	res.send(finalData);
});

// POST a new game
router.post('/', async (req, res) => {
	const newGameRef = doc(collection(db, 'AllGames'));

	let newGameData = {
		date: req.body.date,
		description: req.body.description,
		court: req.body.court,
		end_time: req.body.end_time,
		gender: req.body.gender,
		host_id: req.body.host_id,
		location: req.body.location,
		cancellation_policy: req.body.cancellation_policy,
		players_current: req.body.players_current,
		players_limit: req.body.players_limit,
		poster_url: req.body.poster_url,
		price: req.body.price,
		service_fee: req.body.service_fee,
		skill_level: req.body.skill_level,
		start_time: req.body.start_time,
		title: req.body.title,
		game_id: newGameRef.id,
		address: req.body.address
	};

	await setDoc(newGameRef, newGameData)
		.then(() => {
			res.status(200);
		})
		.catch((err) => {
			res.status(400);
			console.log(err);
			res.json({ error: err });
		});
});

module.exports = router;
