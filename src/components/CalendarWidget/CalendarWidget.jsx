// Styles
import './calendar-widget.scss';

// Components
import Calendar from '../Calendar/Calendar';

// Dependencies
import { useContext, useState } from 'react';
import { HomeContext } from '../../context/HomeContext';

function CalendarWidget({ onClick }) {
	// State
	const [ dateHover, setDateHover ] = useState();

	// Context Variables
	let { toggleComponents } = useContext(HomeContext);

	return (
		<div className="calendar-widget" onClick={onClick}>
			<Calendar month={toggleComponents.calendar.monthStart} dateHover={dateHover} setDateHover={setDateHover} />
			<Calendar month={toggleComponents.calendar.monthEnd} dateHover={dateHover} setDateHover={setDateHover} />
		</div>
	);
}

export default CalendarWidget;
