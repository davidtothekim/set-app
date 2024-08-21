// Stylesheet
import './host-game-page.scss';

//Assets
import backArrowIcon from '../../assets/icons/back-arrow-icon.svg';
import logo from '../../assets/icons/logo-navy.svg';

// Components
import Header from '../../components/Header/Header';
import FooterMobile from '../../components/FooterMobile/FooterMobile';
import Button from '../../components/Button/Button';
import HostGameForm from '../../components/HostGameForm/HostGameForm';

// Helpers
import pageContents from '../../utils/hostGamePageContent';
import formatDate from '../../utils/formatDate';

// Dependencies
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

function HostGamePage() {
	// env Variables
	const SERVER_URL = import.meta.env.VITE_REACT_APP_SERVER_URL;

	// Initialize navigate hook
	const navigate = useNavigate();

	// State to track the stage the user is currently at in overall process
	const [userStage, setUserStage] = useState(0);

	// State to track values of the form
	const [userForm, setUserform] = useState({
		title: '',
		description: '',
		price: null,
		skill_level: '',
		court: '',
		gender: '',
		date: '',
		start_time: '',
		end_time: '',
		address: '',
		cancellation_policy: '',
		isSubmitted: false,
		host_id: '',
		location: '',
		players_current: 0,
		players_limit: null,
		poster_url: 'https://images.pexels.com/photos/6203559/pexels-photo-6203559.jpeg',
		service_fee: 2.5,

	});

	// Refs
	const formRef = useRef();

	// Functions
	// Event Handlers
	const handleClickNext = () => {
		// if (!validateForm(formRef.current)) return alert('Please make sure you have completed all input fields!');

		let userFormValues = {};

		for (let input of formRef.current) {
			let key = input.id;
			let value = input.value;

			// Format date before storing it
			if (key === 'date') {

				let date = new Date(`${value}T00:00:00-05:00`);
				value = date.toLocaleDateString('en-us', {month: '2-digit', day: '2-digit', year: 'numeric'})
			}

			if (key === 'price' || key === 'players_limit') {
				value = parseFloat(value);
			}

			// Format start time and end time before storing it
			if (key === 'end_time' || key === 'start_time') {
				let hour = parseInt(value.split(":")[0])
				let minutes = value.split(":")[1];
				value = hour - 12 >= 0 ? `${hour-12}:${minutes}pm` : `${hour}:${minutes}pm`
			}

			// Update userFormValues with input values
			userFormValues[key] = value
		}

		// Check userStage to determine whether the form has been submitted or not
		// if (userStage === 2) {
		// 	console.log("here")
		// 	setUserform({...userForm, ...userFormValues, isSubmitted: true})
		// 	handleCreateGame();
		// 	return;
		// } else {
		// 	setUserStage((userStage) => userStage + 1);
		// }

		if (userStage === 2) {
			setUserform({...userForm, ...userFormValues, isSubmitted: true});
		} else {
			setUserStage((userStage) => userStage + 1);
			setUserform({...userForm, ...userFormValues})
		}
	};

	const handleClickBack = () => {
		setUserStage((userStage) => userStage - 1);
	};

	const handleClickHome = () => {
		navigate('/');
	};

	const handleCreateGame = async () => {

		let location = userForm.address.split(':')[0];
		let address = userForm.address.split(':')[1];

		await axios.post(`${SERVER_URL}/games`, {
			...userForm,
			address: address,
			location: location
		})

	}
	// Create Progress Bar
	const createProgressBar = (userStage) => {
		return (
			<div className="host-game-page__progress-bar-container">
				{Array(userStage + 1).fill(1).map((num, i) => {
					return (
						<div className="host-game-page__progress-bar host-game-page__progress-bar--selected" key={i} />
					);
				})}
				{Array(2 - userStage).fill(1).map((num, i) => {
					return <div className="host-game-page__progress-bar" key={i} />;
				})}
			</div>
		);
	};

	// Validate Form
	const validateForm = (form) => {
		for (let input of form) {
			// All Inputs
			// Cannot be an empty
			if (input.value === '') return false;

			// Number Inputs
			// Cannot be non integers
			if (input.type === 'number' && !input.value.match(/^[0-9]+$/) ? true : false) return false;

			return true;
		}
	};

	//UseEffects
	// Fetch User info
		useEffect(
			() => {
				(async () => {
					let user = await axios.get(`${SERVER_URL}/users/profile`, { withCredentials: true }).then((res) => res.data);
					setUserform({ ...userForm, host_id: user.google_id });
				})();
			}, [])
	// POST request once form is submitted
		useEffect(
			() => {
				if (userForm.isSubmitted ) {
					console.log(userForm);
					handleCreateGame();
				}
			}, [userForm]
		)

	return (
		<div className="host-game-page">
			<div className="host-game-page__header">
				<img className="host-game-page__logo" src={logo} alt="logo" />
				<div className="host-game-page__desktop-container">
					<Header />
				</div>
			</div>

			<main className="host-game-page__main content-wrapper">
				{userForm.isSubmitted ?
					<div className="host-game-page__confirmation-modal">
						<h2 className="host-game-page__text host-game-page__text--title">Game created!</h2>
						<img
							className={`host-game-page__hero-image host-game-page__hero-image--${pageContents[userStage].image
								.name} host-game-page__hero-image--confirmation-modal`}
							src={pageContents[3].image.url}
						/>
						<p className="host-game-page__text host-game-page__text--bold">Waiting for players to join</p>
						<p className="host-game-page__text">Please note: number of player requirements need to be met at least 48 hours before scheduled time</p>
						<div className="host-game-page__confirmation-modal-footer">
							<Button text="Share Link" types={['blue']}/>
							<Button text="View game" types={['white']}/>
						</div>
					</div> :
					<>
						<section className="host-game-page__form">
							<div className="host-game-page__nav-link">
								<img className="host-game-page__nav-icon" src={backArrowIcon} alt="back-arrow" />
								<a
									className="host-game-page__nav-text"
									onClick={userStage === 0 ? handleClickHome : handleClickBack}
								>
									{pageContents[userStage].navLink.text}
								</a>
							</div>

							{createProgressBar(userStage)}
							<HostGameForm stage={userStage} userForm={userForm} setUserform={setUserform} innerRef={formRef} />
						</section>

						<img
							className={`host-game-page__hero-image host-game-page__hero-image--${pageContents[userStage].image
								.name}`}
							src={pageContents[userStage].image.url}
						/>
						<div className="host-game-page__button-container">
							<div className="host-game-page__divider" />
							<div style={{ visibility: `${userStage === 0 ? 'hidden' : 'visible'}` }}>
								<div className="host-game-page__mobile-container">
									<Button text="Back" types={['hyperlink', 'small']} onClick={handleClickBack} />
								</div>
							</div>
							<Link className="host-game-page__desktop-container" to={'/'}>
								<p>Cancel</p>
							</Link>
							<div className="host-game-page__desktop-container" to={'/'}>
								<Button text="Next" types={['blue', 'small']} onClick={handleClickNext} />
							</div>
							<div className="host-game-page__mobile-container" to={'/'}>
								<Button text="Next" types={['grey', 'small']} onClick={handleClickNext} />
							</div>
						</div>
					</>
				}
			</main>

			<footer className="host-game-page__footer">
				<FooterMobile />
			</footer>
		</div>
	);
}

export default HostGamePage;

// onClick={(userStage === 2) ? handleCreateGame : handleClickNext}