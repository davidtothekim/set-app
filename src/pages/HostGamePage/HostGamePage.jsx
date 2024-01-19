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

// Dependencies
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function HostGamePage() {
	// Initialize navigate hook
	const navigate = useNavigate();

	// State to track the stage the user is currently at in overall process
	const [ userStage, setUserStage ] = useState(0);

	// State to track values of the form
	const [ userForm, setUserform ] = useState({
		title: '',
		players: null,
		cost: null,
		skillLevel: '',
		type: '',
		gender: '',
		date: '',
		startTime: '',
		endTime: '',
		address: '',
		details: '',
		hostMessage: ''
	});

	// Refs
	const formRef = useRef();

	// Functions
	// Event Handlers
	const handleClickNext = () => {
		if (!validateForm(formRef.current)) return alert('Please make sure you have completed all input fields!');
		setUserStage((userStage) => userStage + 1);
	};

	const handleClickBack = () => {
		setUserStage((userStage) => userStage - 1);
	};

	const handleClickHome = () => {
		navigate('/');
	};

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

	return (
		<div className="host-game-page">
			<div className="host-game-page__header">
				<img className="host-game-page__logo" src={logo} alt="logo" />
				<div className="host-game-page__desktop-container">
					<Header />
				</div>
			</div>

			<main className="host-game-page__main content-wrapper">
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
							<Button text="Back" types={[ 'hyperlink', 'small' ]} onClick={handleClickBack} />
						</div>
					</div>
					<Link className="host-game-page__desktop-container" to={'/'}>
						<p>Cancel</p>
					</Link>
					<div className="host-game-page__desktop-container" to={'/'}>
						<Button text="Next" types={[ 'blue', 'small' ]} onClick={handleClickNext} />
					</div>
					<div className="host-game-page__mobile-container" to={'/'}>
						<Button text="Next" types={[ 'grey', 'small' ]} onClick={handleClickNext} />
					</div>
				</div>
			</main>

			<footer className="host-game-page__footer">
				<FooterMobile />
			</footer>
		</div>
	);
}

export default HostGamePage;
