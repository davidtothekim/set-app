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

// Components
import Footer from '../../components/Footer/Footer';
import Button from '../../components/Button/Button';
import FooterMobile from '../../components/FooterMobile/FooterMobile';

// Dependencies
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

function GameInfoPage() {
	// Capture game id from URL
	const { gameId } = useParams();

	// Express Server URL
	const SERVER_URL = import.meta.env.VITE_REACT_APP_SERVER_URL;

	// State for the game that should be displayed on the page
	const [ game, setGame ] = useState({});

	useEffect(() => {
		(async () => {
			let game = await axios.get(`${SERVER_URL}/games/${gameId}`).then((res) => res.data[0]);
			setGame({
				...game,
				price: game.price.toFixed(2),
				service_fee: game['service_fee'].toFixed(2),
				total_price: (game.price + game['service_fee']).toFixed(2),
				date: moment(game.date, 'M/D/Y').format('dddd MMMM D Y')
			});
		})();
	}, []);

	return (
		<div className="game-info-page">
			<header className="game-info-page__header">
				<img className="game-info-page__logo" src={logo} alt="logo" />
			</header>
			{/* <Header /> */}

			<section className="game-info-page__hero" />

			<main className="game-info-page__main main-content">
				<h1 className="game-info-page__title">Coed Intermediate Drop In</h1>

				<div className="game-info-page__host">
					<div className="game-info-page__host-avatar" />
					<div className="game-info-page__host-info">
						<p className="game-info-page__text game-info-page__text--bold">Kathy Dang</p>
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
							<p className="game-info-page__text">15 Going</p>
						</div>
						<div className="game-info-page__guest-attendance">
							<img className="game-info-page__icon" src={peopleIcon} alt="spots left" />
							<p className="game-info-page__text">3 Spots left</p>
						</div>
					</div>
				</div>

				<div className="game-info-page__date-and-time">
					<h3 className="game-info-page__sub-title">Date & Time</h3>
					<div className="game-info-page__details">
						<img className="game-info-page__icon" src={calendarIcon} alt="calendar" />
						<div className="game-info-page__page__content">
							<p className="game-info-page__text">Tue Jan 10, 2023</p>
							<p className="game-info-page__text">11:00 am - 1:00 pm</p>
						</div>
					</div>
				</div>

				<div className="game-info-page__location">
					<h3 className="game-info-page__sub-title">Location</h3>
					<div className="game-info-page__details">
						<img className="game-info-page__icon" src={locationIcon} alt="location pin" />
						<div className="game-info-page__content">
							<p className="game-info-page__text">Ellesmere Community Centre</p>
							<p className="game-info-page__text game-info-page__text--gray">
								154 Danforth Avenue #2nd floor Toronto, ON M4K 1N1
							</p>
							<p className="game-info-page__text game-info-page__text--light">show map</p>
						</div>
					</div>
				</div>

				<div className="game-info-page__game-info">
					<h3 className="game-info-page__sub-title">Game Info</h3>
					<div className="game-info-page__game-info-tags">
						<div className="game-info-page__game-info-tag">
							<img className="game-info-page__icon" src={trophyIcon} alt="trophy" />
							<p className="game-info-page__text">Intermediate</p>
						</div>
						<div className="game-info-page__game-info-tag">
							<img className="game-info-page__icon" src={genderIcon} alt="gender" />
							<p className="game-info-page__text">Coed</p>
						</div>
						<div className="game-info-page__game-info-tag">
							<img className="game-info-page__icon" src={courtIcon} alt="indoor court" />
							<p className="game-info-page__text">Indoor Court</p>
						</div>
					</div>
					<p className="game-info-page__text">
						Single court, we will be using Court #2. Please show up couple minutes early so we can make
						teams.
					</p>
					<p className="game-info-page__text">--</p>
					<p className="game-info-page__text">Net Height: Coed</p>
				</div>

				<div className="game-info-page__cancellation-policy">
					<h3 className="game-info-page__sub-title">Cancellation Policy</h3>

					<p className="game-info-page__text">
						If full number of players are not met 24 hours before scheduled time, all players will receive a
						refund.
					</p>
				</div>
			</main>

			<section className="game-info-page__join-game">
				<div className="game-info-page__total-price">
					<p className="game-info-page__text game-info-page__text--large game-info-page__text--bold">
						$11.70 <span className="game-info-page__text">per player</span>
					</p>
				</div>
				<Button text="Join Game" types={[ 'yellow', 'medium' ]} />
			</section>

			<footer className="game-info-page__footer">
				<FooterMobile />
			</footer>
		</div>
	);
}

export default GameInfoPage;
