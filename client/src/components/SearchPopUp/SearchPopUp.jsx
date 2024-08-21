// Styles
import './search-pop-up.scss';

// Assets
import closeIcon from '../../assets/icons/exit-icon.svg';
import searchIcon from '../../assets/icons/search-icon-lightgrey.svg';

// Components
import CalendarWidget from '../../components/CalendarWidget/CalendarWidget';
import Button from '../../components/Button/Button';
import AddPlayersCounter from '../../components/AddPlayersCounter/AddPlayersCounter';
import AddressSearch from '../../components/AddressSearch/AddressSearch';

// Dependencies
import { useContext, useState } from 'react';
import { ToggleComponentsContext } from '../../context/ToggleComponentsContext';

// Helpers
import formatDate from '../../utils/formatDate';

function SearchPopUp({setSearchCriteria}) {

	// ToggleComponents Context
	let { handleToggleClick, toggleComponents, resetToggleComponents, setToggleComponents } = useContext(ToggleComponentsContext);

	// Address State
	const [addressVicinity, setAddressVicinity] = useState('')

	// Variables
		let dateStartFormatted = formatDate(toggleComponents.calendar.selectedDayStart);
		let dateEndFormatted = formatDate(toggleComponents.calendar.selectedDayEnd);
		let selectedPlayers = toggleComponents.addPlayersCounter.count;

	// Functions
		// Event Handlers
	const searchHandler = (e) => {
        e.stopPropagation();
        setSearchCriteria({
            addressVicinity: (addressVicinity !== '' ? addressVicinity : ''),
            players: selectedPlayers,
            dates: {
                startDate: (toggleComponents.calendar.selectedDayStart !== '' ? dateStartFormatted : ''),
                endDate: (toggleComponents.calendar.selectedDayEnd !== '' ? dateEndFormatted : '')
            }
        })
		setToggleComponents(resetToggleComponents);
    }

	return (
		<div className="search-pop-up">
			<div
				className="search-pop-up__close"
				onClick={() => {
					setToggleComponents(resetToggleComponents());
				}}
			>
				<img className="search-pop-up__close-icon" alt="close" src={closeIcon} />
			</div>
			<div className="search-pop-up__container search-pop-up__container--location">
				<p className="search-pop-up__text">Where</p>
				<div className="search-pop-up__search">
					<img className="search-pop-up__search-icon" src={searchIcon} alt="search" />
					<AddressSearch setAddressVicinity={setAddressVicinity}/>
				</div>
			</div>
			<div
				className="search-pop-up__container search-pop-up__container--when"
			>
				<div className="search-pop-up__content" onClick={() => {
					handleToggleClick('calendar');
				}}>
					<p className="search-pop-up__text">When</p>
					{ !toggleComponents.calendar.isToggled && (toggleComponents.calendar.selectedDayStart === '' && toggleComponents.calendar.selectedDayEnd === '') && <p className="search-pop-up__text search-pop-up__text--gray">Choose dates</p>}
					{ !toggleComponents.calendar.isToggled && (toggleComponents.calendar.selectedDayStart !== '' &&  toggleComponents.calendar.selectedDayEnd!== '') && <p className="search-pop-up__text search-pop-up__text--gray">{`${new Date(toggleComponents.calendar.selectedDayStart).toLocaleDateString('en-us', {month: 'short', day:'numeric', year:'numeric'})} - ${new Date(toggleComponents.calendar.selectedDayEnd).toLocaleDateString('en-us', {month: 'short', day: 'numeric', year:'numeric'})}`}</p>}
					{ !toggleComponents.calendar.isToggled && (toggleComponents.calendar.selectedDayStart !== '' && toggleComponents.calendar.selectedDayEnd === '') && <p className="search-pop-up__text search-pop-up__text--gray">{new Date(toggleComponents.calendar.selectedDayStart).toLocaleDateString('en-us', {month: 'short', day: 'numeric', year: 'numeric'})}</p>}

				</div>
				{toggleComponents.calendar.isToggled && <>
					<CalendarWidget/>
					<div className="search-pop-up__buttons">
						<p className="search-pop-up__cta" onClick={() => {setToggleComponents({...toggleComponents, calendar: {...toggleComponents.calendar, selectedDayStart: '', selectedDayEnd: '', isToggled: false}})}}>Close</p>
						<Button text="Next" types={['white', 'small']} onClick={() => {handleToggleClick('calendar')}}/>
					</div>
				</>}

			</div>
			<div className="search-pop-up__container search-pop-up__container--who">
				<div className="search-pop-up__content" onClick={() => {handleToggleClick('addPlayersCounter')}}>
					<p className="search-pop-up__text">Who</p>
					{toggleComponents.addPlayersCounter.isToggled ? <AddPlayersCounter onClick={(e) => e.stopPropagation()}/> : <p className="search-pop-up__text search-pop-up__text--gray">Add players</p>}
				</div>
			</div>

			<div className="search-pop-up__footer-push"></div>
			<div className="search-pop-up__footer">
				<Button text="Search" types={['white', 'small']} onClick={searchHandler}/>
			</div>


		</div>
	);
}

export default SearchPopUp;
