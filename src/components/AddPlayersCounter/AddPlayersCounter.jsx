// Styles
import './add-players-counter.scss';

// Assets
import plusIcon from '../../assets/icons/plus-icon.svg';
import minusIcon from '../../assets/icons/minus-icon.svg';

// Dependencies
import { useContext } from 'react';
import { HomeContext } from '../../context/HomeContext';

function AddPlayersCounter({ onClick }) {
	// Variables
	// Home Context
	let { toggleComponents, setToggleComponents } = useContext(HomeContext);

	// Functions
	// Event Handlers
	const handlePlusClick = () => {
		setToggleComponents((prevState) => ({
			...prevState,
			addPlayersCounter: { ...prevState.addPlayersCounter, count: prevState.addPlayersCounter.count + 1 }
		}));
	};

	const handleMinusClick = () => {
		setToggleComponents((prevState) => ({
			...prevState,
			addPlayersCounter: { ...prevState.addPlayersCounter, count: prevState.addPlayersCounter.count - 1 }
		}));
	};

	return (
		<div className="add-players-counter" onClick={onClick}>
			<div className="add-players-counter__icon" onClick={handleMinusClick}>
				<img className="add-players-counter__minus-icon" src={minusIcon} alt="minus" />
			</div>
			<div className="add-players-counter__count">
				<p className="add-players-counter__text">{toggleComponents.addPlayersCounter.count}</p>
			</div>
			<div className="add-players-counter__icon" onClick={handlePlusClick}>
				<img className="add-players-counter__plus-icon__plus-icon" src={plusIcon} alt="plus" />
			</div>
		</div>
	);
}

export default AddPlayersCounter;
