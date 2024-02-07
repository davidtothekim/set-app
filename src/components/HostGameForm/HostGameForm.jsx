// Stylesheet
import './host-game-form.scss';

// Assets
import calendarIcon from '../../assets/icons/calendar-icon-lightgrey.svg';
import searchIcon from '../../assets/icons/search-icon-darkgrey.svg';

// Components
import AddressSearch from '../AddressSearch/AddressSearch';

// Helpers
import formatDate from '../../utils/formatDate';

function HostGameForm({ stage, userForm, setUserform, innerRef }) {

	const onChangeHandler = (e) => {
		let value = e.target.value;

		e.target.value = value;
	}

	if (stage === 0) {
		return (
			<>
				<form className="host-game-form" ref={innerRef}>

					<div className="host-game-form__title-container">
						<h2 className="host-game-form__title">Step 1: Basic Info</h2>
						<p className="host-game-form__content">Let players know what type game and players to expect</p>
					</div>

					<div className="host-game-form__input-container">
						<input type="text" placeholder="Title" id="title" defaultValue={userForm.title} onChange={onChangeHandler} required></input>
					</div>

					<div className="host-game-form__row">
						<div className="host-game-form__input-container">
							<input type="number" placeholder="# of players" min="12" max="36" id="players_limit" defaultValue={userForm.players} onChange={onChangeHandler}/>
						</div>
						<div className="host-game-form__input-container host-game-form__input-container--right">
							<input type="number" placeholder="Cost per player" id="price" min="0" defaultValue={`{userForm.cost}`} onChange={onChangeHandler}/>
						</div>
					</div>

					<div className="host-game-form__input-container">
						<select id="skill_level" onChange={onChangeHandler} >
							<option value="" selected disabled hidden>Skill Level</option>
							<option value="recreational">Recreational</option>
							<option value="beginner">Beginner</option>
							<option value="intermediate">Intermediate</option>
							<option value="advanced">Advanced</option>
						</select>
					</div>

					<div className="host-game-form__row">
						<div className="host-game-form__input-container">
							<select id="court" onChange={onChangeHandler}>
								<option value="" selected disabled hidden>Type</option>
								<option value="Indoor">Indoor</option>
								<option value="Beach">Beach</option>
								<option value="Field">Field</option>
							</select>
						</div>

						<div className="host-game-form__input-container host-game-form__input-container--right">
							<select id="gender" onChange={onChangeHandler}>
								<option value="" selected disabled hidden>Gender</option>
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
				<form className="host-game-form" ref={innerRef}>

					<div className="host-game-form__title-container">
						<h2 className="host-game-form__title">Step 2: Location</h2>
						<p className="host-game-form__content">Let players know where and when the game is</p>
					</div>

					<div className="host-game-form__input-container">
						<input type="date" placeholder="Date" id="date" defaultValue={""} onChange={onChangeHandler}/>
						<img
							className="host-game-form__icon host-game-form__icon--right"
							src={calendarIcon}
							alt="calendar"
						/>
					</div>

					<div className="host-game-form__row">
						<div className="host-game-form__input-container">
							<input type="time" placeholder="Start time" id="start_time" onChange={onChangeHandler}/>
						</div>
						<div className="host-game-form__input-container host-game-form__input-container--right">
							<input type="time" placeholder="End time" id="end_time" onChange={onChangeHandler} />
						</div>
					</div>

					<div className="host-game-form__input-container host-game-form__input-container--search">
						<img className="host-game-form__icon host-game-form__icon--left" src={searchIcon} alt="search" />
						<AddressSearch setUserform={setUserform} userForm={userForm}/>
					</div>
				</form>
			</>
		);
	}

	if (stage === 2) {
		return (
			<>
				<form className="host-game-form" ref={innerRef}>

					<div className="host-game-form__title-container">
						<h2 className="host-game-form__title">Step 3: Details</h2>
						<p className="host-game-form__content">Any extra info you would like to inform players</p>
					</div>

					<textarea
						id="description"
						className="host-game-form__textarea host-game-form__textarea--long"
						placeholder="More details"
						onChange={onChangeHandler}
					/>
					<textarea
						id="cancellation_policy"
						onChange={onChangeHandler}
						className="host-game-form__textarea host-game-form__textarea--medium"
						placeholder="Cancellation policy"
					/>
				</form>
			</>
		);
	}
}

export default HostGameForm;
