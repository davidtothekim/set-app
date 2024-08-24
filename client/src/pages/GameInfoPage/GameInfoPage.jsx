// Styles
import './game-info-page.scss';

// Assets
import trophyIcon from '../../assets/icons/ranking-icon.svg';
import genderIcon from '../../assets/icons/coed-icon-navy.svg';
import courtIcon from '../../assets/icons/court-icon.svg';
import confirmIcon from '../../assets/icons/confirm-icon.svg';
import peopleIcon from '../../assets/icons/people-icon.jpg';
import calendarIcon from '../../assets/icons/calendar-icon.svg';
import locationIcon from '../../assets/icons/location-icon.svg';
import logo from '../../assets/icons/logo-navy.svg';
import servingImage from '../../assets/Images/serving-image-2.svg';

// Components
import Footer from '../../components/Footer/Footer';
import Button from '../../components/Button/Button';
import FooterMobile from '../../components/FooterMobile/FooterMobile';
import Header from '../../components/Header/Header';

// Dependencies
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';

function GameInfoPage() {
	// Capture game id from URL
	const { gameId } = useParams();

	const user = {
		avatar_url: 'https://lh3.googleusercontent.com/a/ACg8ocKvyuvKyIeFu6PUTBE7Mf2M_dPwiVgOqTZPeKYWMc5zJw=s96-c',
		display_name: 'David Kim',
		google_id: '101668191479577070173'
	};

	// Express Server URL
	const SERVER_URL = import.meta.env.VITE_SERVER_URL;

	// State for the game that should be displayed on the page
	const [ game, setGame ] = useState({});

	// State for whether a user has joined the game
	const [ gameJoined, setGameJoined ] = useState(false);

	// Functions
	// Event Handlers
	const joinGameHandler = async () => {
		// If the game is already full, display a popup message
		if (parseInt(game.players_limit) - parseInt(game.players_current) === 0) {
			window.alert('sorry the game is already full!');
			return;
		}
		await axios.post(`${SERVER_URL}/games/${gameId}`).then((res) => res.data);
		setGameJoined(true);
	};

	// UseEffect - GET game info
	useEffect(() => {
		(async () => {
			let game = await axios.get(`${SERVER_URL}/games/${gameId}`).then((res) => res.data[0]);
			// let user = await axios.get(`${SERVER_URL}/users/${game.host_id}`).then((res) => res.data[0]);
			setGame({
				...game,
				price: parseFloat(game.price).toFixed(2),
				service_fee: game['service_fee'].toFixed(2),
				total_price: (game.price + game['service_fee']).toFixed(2),
				date: moment(game.date, 'M/D/Y').format('dddd MMMM D Y')
			});
		})();
	}, []);

	// Conditional Rendering - checks whether the user has clicked to join the game

	if (gameJoined)
		return (
			<div className="game-info-page">
				<header className="game-info-page__header">
					<Link to={'/'}>
						<img className="game-info-page__logo" src={logo} alt="logo" />
					</Link>
					<div className="game-info-page__border" />
					<div className="game-info-page__header--desktop">
						<Header />
					</div>
				</header>

				<main className="game-info-page__main game-info-page__main--confirmation main-content">
					<h1 className="game-info-page__title game-info-page__title--confirmation">You're in!</h1>
					<img src={servingImage} alt="serving" className="game-info-page__image" />
					<p className="game-info-page__text game-info-page__text--bold">Waiting for players to join</p>
					<p className="game-info-page__text game-info-page__text--light-gray game-info-page__text--slim">
						Please note: number of player requirements need to be met at least 48 hours before scheduled
						time
					</p>
					<div className="game-info-page__buttons">
						<Button text="Share link" types={[ 'blue' ]} />
						<Link to={'/'}>
							<Button text="View more games" types={[ 'white' ]} />
						</Link>
					</div>
				</main>

				<footer className="game-info-page__footer">
					<div className="game-info-page__desktop-container">
						<Footer />
					</div>
					<FooterMobile />
				</footer>
			</div>
		);

	return (
		<div className="game-info-page">
			<header className="game-info-page__header">
				<img className="game-info-page__logo" src={logo} alt="logo" />
				<div className="game-info-page__header--desktop">
					<Header />
				</div>
			</header>

			<section className="game-info-page__hero" style={{ backgroundImage: `url(${game.poster_url})` }} />

			<main className="game-info-page__main main-content">
				<div className="game-info-page__content-block">
					<h1 className="game-info-page__title">{game.title}</h1>
					<div className="game-info-page__host">
						<div
							className="game-info-page__host-avatar"
							style={{
								backgroundImage: `url(${user.avatar_url})`
							}}
						/>
						<div className="game-info-page__host-info">
							<p className="game-info-page__text game-info-page__text--bold">{user.display_name}</p>
							<p className="game-info-page__text">
								Host{' '}
								<span className="game-info-page__text game-info-page__text--gray game-info-page__text--small">
									Joined May 2023
								</span>
							</p>
						</div>
					</div>
					<div className="game-info-page__guest-list">
						<h3 className="game-info-page__sub-title">Guest List</h3>
						<div className="game-info-page__guests">
							<div className="game-info-page__guest-attendance">
								<img className="game-info-page__icon" src={confirmIcon} alt="checkmark" />
								<p className="game-info-page__text">{game.players_current} Going</p>
							</div>
							<div className="game-info-page__guest-attendance">
								<img className="game-info-page__icon" src={peopleIcon} alt="spots left" />
								<p className="game-info-page__text">
									{game.players_limit - game.players_current} Spots left
								</p>
							</div>
						</div>
					</div>
					<div className="game-info-page__date-and-time">
						<h3 className="game-info-page__sub-title">Date & Time</h3>
						<div className="game-info-page__details">
							<img className="game-info-page__icon" src={calendarIcon} alt="calendar" />
							<div className="game-info-page__page__content">
								<p className="game-info-page__text">{game.date}</p>
								<p className="game-info-page__text">
									{game.start_time} - {game.end_time}
								</p>
							</div>
						</div>
					</div>
					<div className="game-info-page__location">
						<h3 className="game-info-page__sub-title">Location</h3>
						<div className="game-info-page__details">
							<img className="game-info-page__icon" src={locationIcon} alt="location pin" />
							<div className="game-info-page__content">
								<p className="game-info-page__text">{game.location}</p>
								<p className="game-info-page__text game-info-page__text--gray">{game.address}</p>
								<p className="game-info-page__text game-info-page__text--light">show map</p>
							</div>
						</div>
					</div>
					<div className="game-info-page__game-info">
						<h3 className="game-info-page__sub-title">Game Info</h3>
						<div className="game-info-page__game-info-tags">
							<div className="game-info-page__game-info-tag">
								<img className="game-info-page__icon" src={trophyIcon} alt="trophy" />
								<p className="game-info-page__text game-info-page__text--capitalize">
									{game.skill_level}
								</p>
							</div>
							<div className="game-info-page__game-info-tag">
								<img className="game-info-page__icon" src={genderIcon} alt="gender" />
								<p className="game-info-page__text game-info-page__text--capitalize">{game.gender}</p>
							</div>
							<div className="game-info-page__game-info-tag">
								<img className="game-info-page__icon" src={courtIcon} alt="indoor court" />
								<p className="game-info-page__text game-info-page__text--capitalize">
									{game.court} Court
								</p>
							</div>
						</div>
						<p className="game-info-page__text">{game.description}</p>
						<p className="game-info-page__text">--</p>
						<p className="game-info-page__text">
							Net Height:{' '}
							<span className="game-info-page__text game-info-page__text--capitalize">{game.gender}</span>
						</p>
					</div>
					<div className="game-info-page__cancellation-policy">
						<h3 className="game-info-page__sub-title">Cancellation Policy</h3>
						<p className="game-info-page__text">
							If full number of players are not met 24 hours before scheduled time, all players will
							receive a refund.
						</p>
					</div>
				</div>
				<div className="game-info-page__aside">
					<div className="game-info-page__join-game game-info-page__join-game--desktop">
						<div className="game-info-page__price">
							<p className="game-info-page__text game-info-page__text--large game-info-page__text--bold">
								${game.price} <span className="game-info-page__text">per player</span>
							</p>
						</div>
						<div className="game-info-page__guests game-info-page__guests--desktop">
							<div className="game-info-page__guest-attendance game-info-page__guest-attendance--desktop game-info-page__guest-attendance--left">
								<p className="game-info-page__text game-info-page__text--bold">Going</p>
								<img
									className="game-info-page__icon game-info-page__icon--desktop"
									src={confirmIcon}
									alt="confirm"
								/>
								<p className="game-info-page__text">
									{game.players_current}/{game.players_limit}
								</p>
							</div>
							<div className="game-info-page__guest-attendance game-info-page__guest-attendance--desktop game-info-page__guest-attendance--right">
								<p className="game-info-page__text game-info-page__text--bold">Spots</p>
								<img
									className="game-info-page__icon game-info-page__icon--desktop"
									src={peopleIcon}
									alt="people"
								/>
								<p className="game-info-page__text game-info-page__text--bold">
									{game.players_limit - game.players_current}
								</p>
							</div>
						</div>
						<Button text="Join Game" types={[ 'yellow', 'medium' ]} onClick={joinGameHandler} />
						<div className="game-info-page__price-calculation game-info-page__price-calculation--top">
							<p className="game-info-page__text game-info-page__text--underline">
								${game.price} per player
							</p>
							<p className="game-info-page__text">${game.price}</p>
						</div>
						<div className="game-info-page__price-calculation">
							<p className="game-info-page__text game-info-page__text--underline">Service fee</p>
							<p className="game-info-page__text">${game.service_fee}</p>
						</div>
						<div className="game-info-page__price-calculation game-info-page__price-calculation--total">
							<p className="game-info-page__text game-info-page__text--bold">TOTAL</p>
							<p className="game-info-page__text game-info-page__text--bold">
								${(parseFloat(game.price) + parseFloat(game.service_fee)).toFixed(2)}
							</p>
						</div>
					</div>
					<Button text="Share Game" types={[ 'blue' ]} />
					<Button text="Message Host" types={[ 'white' ]} />
				</div>
			</main>

			<section className="game-info-page__join-game">
				<div className="game-info-page__price">
					<p className="game-info-page__text game-info-page__text--large game-info-page__text--bold">
						$11.70 <span className="game-info-page__text">per player</span>
					</p>
				</div>
				<Button text="Join Game" types={[ 'yellow', 'medium' ]} onClick={joinGameHandler} />
			</section>

			<footer className="game-info-page__footer">
				<div className="game-info-page__desktop-container">
					<Footer />
				</div>
				<FooterMobile />
			</footer>
		</div>
	);
}

export default GameInfoPage;
