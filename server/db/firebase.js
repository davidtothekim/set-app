const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc, collection, getDocs, query } = require('firebase/firestore');

const {
	FIREBASE_API_KEY,
	FIREBASE_AUTH_DOMAIN,
	FIREBASE_DATABASE_URL,
	FIREBASE_STORAGE_BUCKET,
	FIREBASE_MESSAGING_SENDER_ID,
	FIREBASE_APP_ID,
	FIREBASE_PROJECT_ID
} = process.env;

const firebaseConfig = {
	// apiKey: FIREBASE_API_KEY,
	// authDomain: FIREBASE_AUTH_DOMAIN,
	// databaseURL: FIREBASE_DATABASE_URL,
	// projectId: FIREBASE_PROJECT_ID,
	// storageBucket: FIREBASE_STORAGE_BUCKET,
	// messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
	// appId: FIREBASE_APP_ID
	apiKey: 'AIzaSyBy3JUu3YSyCAsYW8zUOxU5qb5noWiKfUA',
	authDomain: 'set-app-32ec4.firebaseapp.com',
	databaseURL: 'https://set-app-32ec4-default-rtdb.firebaseio.com',
	projectId: 'set-app-32ec4',
	storageBucket: 'set-app-32ec4.appspot.com',
	messagingSenderId: '107818058619',
	appId: '1:107818058619:web:51041ee91e344d5373f3de'
};

let app;
let firestoreDb;

const initializeFirebaseApp = () => {
	try {
		app = initializeApp(firebaseConfig);
		firestoreDb = getFirestore();
	} catch (error) {
		return error;
	}
};

const getData = async (from, to) => {
	const collectionRef = collection(firestoreDb, 'AllGames');
	const finalData = [];
	const q = query(collectionRef);

	const doctSnap = await getDocs(q);

	doctSnap.forEach((doc) => {
		finalData.push(doc.data());
	});

	return finalData;
};

const getFirebaseApp = () => app;

module.exports = {
	initializeFirebaseApp,
	getFirebaseApp,
	getData,
	firestoreDb
};
