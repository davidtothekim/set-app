// Stylesheet
import './host-game-form.scss';

// Assets
import calendarIcon from '../../assets/icons/calendar-icon-lightgrey.svg';
import searchIcon from '../../assets/icons/search-icon-darkgrey.svg';

// Dependencies
import { useEffect } from 'react';

// Helpers
import formatDate from '../../utils/formatDate';

function HostGameForm({ stage, userForm, setUserform }) {

	// Event Handlers
	const formOnChangeHandler = (e) =>  {
		let key = e.target.id;
		let value = e.target.value;

		key === 'date' ? value = formatDate(value) : value 

		if (key === 'endTime' || key === 'startTime') {
			let hour = parseInt(value.split(":")[0])
			let minutes = value.split(":")[1];
			value = hour - 12 >= 0 ? `${hour-12}:${minutes} PM` : `${hour}:${minutes} AM`
		}
		setUserform({...userForm, [key]: value})
	}


	if (stage === 0) {
		return (
			<>
				<form className="host-game-form">

					<div className="host-game-form__title-container">
						<h2 className="host-game-form__title">Step 1: Basic Info</h2>
						<p className="host-game-form__content">Let players know what type game and players to expect</p>
					</div>

					<div className="host-game-form__input-container">
						<input type="text" placeholder="Title" id="title" defaultValue={userForm.title} onChange={formOnChangeHandler}></input>
					</div>

					<div className="host-game-form__row">
						<div className="host-game-form__input-container">
							<input type="number" placeholder="# of players" min="12" max="50" id="players" defaultValue={userForm.players} onChange={formOnChangeHandler}/>
						</div>
						<div className="host-game-form__input-container host-game-form__input-container--right">
							<input type="text" placeholder="Cost per player" id="cost" defaultValue={userForm.cost} onChange={formOnChangeHandler}/>
						</div>
					</div>

					<div className="host-game-form__input-container">
						<select id="skillLevel" onChange={formOnChangeHandler} >
							<option value="" selected disabled hidden>Skill Level</option>
							<option value="recreational">Recreational</option>
							<option value="beginner">Beginner</option>
							<option value="intermediate">Intermediate</option>
							<option value="advanced">Advanced</option>
						</select>
					</div>

					<div className="host-game-form__row">
						<div className="host-game-form__input-container">
							<select id="type" onChange={formOnChangeHandler}>
								<option selected disabled hidden>Type</option>
								<option value="Indoor">Indoor</option>
								<option value="Beach">Beach</option>
								<option value="Field">Field</option>
							</select>
						</div>

						<div className="host-game-form__input-container host-game-form__input-container--right">
							<select id="gender" onChange={formOnChangeHandler}>
								<option selected disabled hidden>Gender</option>
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
						<input type="date" placeholder="Date" id="date" defaultValue={""} onChange={formOnChangeHandler}/>
						<img
							className="host-game-form__icon host-game-form__icon--right"
							src={calendarIcon}
							alt="calendar"
						/>
					</div>

					<div className="host-game-form__row">
						<div className="host-game-form__input-container">
							<input type="time" placeholder="Start time" id="startTime" onChange={formOnChangeHandler}/>
						</div>
						<div className="host-game-form__input-container host-game-form__input-container--right">
							<input type="time" placeholder="End time" id="endTime" onChange={formOnChangeHandler} />
						</div>
					</div>

					<div className="host-game-form__input-container host-game-form__input-container--search">
						<img className="host-game-form__icon host-game-form__icon--left" src={searchIcon} alt="search" />
						<input type="text" placeholder="Search for court or address" id="address" onChange={formOnChangeHandler} />
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
						id="details"
						className="host-game-form__textarea host-game-form__textarea--long"
						placeholder="More details"
						onChange={formOnChangeHandler}
					/>
					<textarea
						id="hostMessage"
						onChange={formOnChangeHandler}
						className="host-game-form__textarea host-game-form__textarea--medium"
						placeholder="Message from host"
					/>
				</form>
			</>
		);
	}
}

export default HostGameForm;
