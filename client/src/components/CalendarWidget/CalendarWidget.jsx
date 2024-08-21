// Styles
import './calendar-widget.scss';

// Components
import Calendar from '../Calendar/Calendar';

// Dependencies
import { useContext, useState } from 'react';
import { ToggleComponentsContext } from '../../context/ToggleComponentsContext';

function CalendarWidget({ onClick }) {
	// State
	// Tracks what date the user is hovering over
	const [ dateHover, setDateHover ] = useState();

	// ToggleComponents Context
	let { toggleComponents } = useContext(ToggleComponentsContext);

	return (
		<div className="calendar-widget" onClick={onClick}>
			<Calendar month={toggleComponents.calendar.monthStart} dateHover={dateHover} setDateHover={setDateHover} />
			<Calendar month={toggleComponents.calendar.monthEnd} dateHover={dateHover} setDateHover={setDateHover} />
		</div>
	);
}

export default CalendarWidget;
