// Stylesheet
import './host-game-form.scss';

// Assets
import calendarIcon from '../../assets/icons/calendar-icon-lightgrey.svg';
import searchIcon from '../../assets/icons/search-icon-darkgrey.svg';
import serveImage from '../../assets/Images/serving-image.svg';
import recieveImage from '../../assets/Images/recieve-image.svg';
import volleyImage from '../../assets/Images/volley-image.svg';

function HostGameForm({ stage }) {
	if (stage === 0) {
		return (
			<>
				<form className="host-game-form">

					<div className="host-game-form__title-container">
						<h2 className="host-game-form__title">Step 1: Basic Info</h2>
						<p className="host-game-form__content">Let players know what type game and players to expect</p>
					</div>

					<div className="host-game-form__input-container">
						<input type="text" placeholder="Title" />
					</div>

					<div className="host-game-form__row">
						<div className="host-game-form__input-container">
							<input type="text" placeholder="# of players" />
						</div>
						<div className="host-game-form__input-container host-game-form__input-container--right">
							<input type="text" placeholder="Cost per player" />
						</div>
					</div>

					<div className="host-game-form__input-container">
						<select>
							<option>Skill Level</option>
							<option value="recreational">Recreational</option>
							<option value="beginner">Beginner</option>
							<option value="intermediate">Intermediate</option>
							<option value="advanced">Advanced</option>
						</select>
					</div>

					<div className="host-game-form__row">
						<div className="host-game-form__input-container">
							<select>
								<option>Type</option>
								<option value="Indoor">Indoor</option>
								<option value="Beach">Beach</option>
								<option value="Field">Field</option>
							</select>
						</div>

						<div className="host-game-form__input-container host-game-form__input-container--right">
							<select>
								<option>Gender</option>
								<option value="coed">Coed</option>
								<option value="mens">Mens</option>
								<option value="womens">Womens</option>
							</select>
						</div>
					</div>
				</form>
			</>
		);
	}

	if (stage === 1) {
		return (
			<>
				<form className="host-game-form">

					<div className="host-game-form__title-container">
						<h2 className="host-game-form__title">Step 2: Location</h2>
						<p className="host-game-form__content">Let players know where and when the game is</p>
					</div>

					<div className="host-game-form__input-container">
						<input type="text" placeholder="Date" />
						<img
							className="host-game-form__icon host-game-form__icon--right"
							src={calendarIcon}
							alt="calendar"
						/>
					</div>

					<div className="host-game-form__row">
						<div className="host-game-form__input-container">
							<input type="text" placeholder="Start time" />
						</div>
						<div className="host-game-form__input-container host-game-form__input-container--right">
							<input type="text" placeholder="End time" />
						</div>
					</div>

					<div className="host-game-form__input-container host-game-form__input-container--search">
						<img className="host-game-form__icon host-game-form__icon--left" src={searchIcon} alt="search" />
						<input type="text" placeholder="Search for court or address" />
					</div>
				</form>
			</>
		);
	}

	if (stage === 2) {
		return (
			<>
				<form className="host-game-form">

					<div className="host-game-form__title-container">
						<h2 className="host-game-form__title">Step 3: Details</h2>
						<p className="host-game-form__content">Any extra info you would like to inform players</p>
					</div>

					<textarea
						className="host-game-form__textarea host-game-form__textarea--long"
						placeholder="More details"
					/>
					<textarea
						className="host-game-form__textarea host-game-form__textarea--medium"
						placeholder="Message from host"
					/>
				</form>
			</>
		);
	}
}

export default HostGameForm;
