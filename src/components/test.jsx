// Styles
import './calendar.scss';

// Dependencies
import { useContext, useState, useEffect } from 'react';
import { HomeContext } from '../../context/HomeContext';

function Calendar({ month }) {
	console.log(month)


	// State
	// Track what date the user is hovering over
	const [ dateHover, setDateHover ] = useState();

	// Variables
	// HomeContext
	const { toggleComponents, setToggleComponents } = useContext(HomeContext);

	// Dates
	let dateRangeStart = toggleComponents.calendar.selectedDayStart;
	let dateRangeEnd = toggleComponents.calendar.selectedDayEnd;

	// Functions
	// Helpers
	const setSelectedDate = (i) => {
		// If there is no selectedDayStart then update selectedDayStart
		if (toggleComponents.calendar.selectedDayStart === '') {
			console.log("theres no starting day!")
			setToggleComponents({
				...toggleComponents,
				calendar: { ...toggleComponents.calendar, selectedDayStart: i }
			});
			console.log(
				`selectedDayStart: ${toggleComponents.calendar.selectedDayStart}, selectedDayEnd: ${toggleComponents
					.calendar.selectedDayEnd}`
			);
		}

		// If there is a selectedDayStart date and the date is 'bigger' then the selectedDayStart update the selectedDayEnd
		if (toggleComponents.calendar.selectedDayStart !== '') {
			if (i > toggleComponents.calendar.selectedDayStart) {
				setToggleComponents({
					...toggleComponents,
					calendar: { ...toggleComponents.calendar, selectedDayEnd: i }
				});
			}
			console.log(
				`selectedDayStart: ${toggleComponents.calendar.selectedDayStart}, selectedDayEnd: ${toggleComponents
					.calendar.selectedDayEnd}`
			);
		}

		// If there is a selectedDayStart and a selectedDayEnd
		if (toggleComponents.calendar.selectedDayStart !== '' && toggleComponents.calendar.selectedDayEnd !== '') {
			// If the selected day is larger than the selectedDayStart then updated the selectedDayEnd
			if (i > toggleComponents.calendar.selectedDayStart) {
				setToggleComponents({
					...toggleComponents,
					calendar: { ...toggleComponents.calendar, selectedDayEnd: i }
				});
			}

			// If the selected day is smaller than the selectedDayStart then reset both selectedDayStart and selectedDayEnd
			if (i < toggleComponents.calendar.selectedDayStart) {
				console.log("resetting selectedDates!")
				setToggleComponents({
					...toggleComponents,
					calendar: { ...toggleComponents.calendar, selectedDayStart:i, selectedDayEnd: ''}
				});
			}
		}

		// If there is a selectedDayStart and the date is 'smaller' than update the selectedDayStart
		// if (toggleComponents.calendar.selectedDayStart !== '' && i < toggleComponents.calendar.selectedDayStart) {
		// 	setToggleComponents({
		// 		...toggleComponents,
		// 		calendar: { ...toggleComponents.calendar, selectedDayStart: i }
		// 	});
		// 	console.log(
		// 		`selectedDayStart: ${toggleComponents.calendar.selectedDayStart}, selectedDayEnd: ${toggleComponents
		// 			.calendar.selectedDayEnd}`
		// 	);
		// }

	};

	// Event Handlers
	const handleMouseOver = (e) => {
		// If start date and end date are not null then just return without updating the dateHover state
		if (toggleComponents.calendar.selectedDayStart !== '' && toggleComponents.calendar.selectedDayEnd !== '') {
			setDateHover('')
			return;
		}

		setDateHover(e.target.innerText);
	};

	let dateStart = toggleComponents.calendar.selectedDayStart;
	let dateEnd = toggleComponents.calendar.selectedDayEnd;

	console.log(`dateStart is ${dateStart}`, `dateEnd is ${dateEnd}`)

	// Renders
	let createCalendarListItem = (i) => {
		
		// If a user clicks and selects a date that is equal to the selectedDayStart or selectedDayEnd
		if (i === dateRangeStart || i === dateRangeEnd) {
			return (
				<li
					onMouseOver={handleMouseOver}
					className="calendar__list-item"
					key={i}
					onClick={() => {
						setSelectedDate(i);
					}}
				>
					<p className="calendar__day calendar__day--selected">{i + 1}</p>
				</li>
			);
		}

		// If there is a selectedDayStart
		if (dateRangeStart !== '') {
			// Then check if the calendar date is greater than the selected date and smaller than the date the user is currently hovering over
			// This means that these dates should be highlighted in blue as the user hovers over different dates to indicate the date range they would be selecting
			if (i > dateRangeStart && i < dateHover - 1) {
				return (
					<li
						onMouseOver={handleMouseOver}
						className="calendar__list-item calendar__list-item--daterange"
						key={i}
						onClick={() => {
							setSelectedDate(i);
						}}
					>
						<p className="calendar__day calendar__day--daterange">{i + 1}</p>
					</li>
				);
			}
		}

		// If there is a selectedDayStart and a selectedDayEnd
		if (dateRangeStart!== "" && dateRangeEnd !== "") {
			// If the date is between the selectedDayStart and selectedDayEnd
			if (i > dateRangeStart && i < dateRangeEnd) {
				return (
					<li
						onMouseOver={handleMouseOver}
						className="calendar__list-item calendar__list-item--daterange"
						key={i}
						onClick={() => {
							setSelectedDate(i);
						}}
					>
						<p className="calendar__day calendar__day--daterange">{i + 1}</p>
					</li>
				);
			} else {
				return (					<li
					id = {i}
					onMouseOver={handleMouseOver}
					className="calendar__list-item"
					key={i}
					onClick={() => {
						setSelectedDate(i);
					}}
				>
					<p className="calendar__day">{i + 1}</p>
				</li>)
			}
		}

		if (dateRangeStart === "") {
			return (
				<li
				id={i}
				onMouseOver={handleMouseOver}
				className="calendar__list-item"
				key={i}
				onClick={() => {
					setSelectedDate(i);
				}}
			>
				<p className="calendar__day">{i + 1}</p>
			</li>

			)
		}

		// If niether of the conditions above apply, just return a normal list item
		return (
			<li
				id={i}
				onMouseOver={handleMouseOver}
				className="calendar__list-item"
				key={i}
				onClick={() => {
					setSelectedDate(i);
				}}
			>
				<p className="calendar__day">{i + 1}</p>
			</li>
		);
	};

	return (
		<>
		<p>SelectedDayStart: {toggleComponents.calendar.selectedDayStart}</p>
		<p>SelectedDayEnd: {toggleComponents.calendar.selectedDayEnd}</p>
		<p>DateHover: {dateHover}</p>
		<div className="calendar">
			<header className="calendar__header">
				<p className="calendar__month">{`${month.month} ${month.year}`}</p>
				<div className="calendar__icons" />
			</header>

			<div className="calendar__body">
				<ul className="calendar__list">
					<li className="calendar__list-item">
						<p className="calendar__weekday">S</p>
					</li>
					<li className="calendar__list-item">
						<p className="calendar__weekday">M</p>
					</li>
					<li className="calendar__list-item">
						<p className="calendar__weekday">T</p>
					</li>
					<li className="calendar__list-item">
						<p className="calendar__weekday">W</p>
					</li>
					<li className="calendar__list-item">
						<p className="calendar__weekday">TH</p>
					</li>
					<li className="calendar__list-item">
						<p className="calendar__weekday">F</p>
					</li>
					<li className="calendar__list-item">
						<p className="calendar__weekday">S</p>
					</li>
				</ul>

				<ul className="calendar__list calendar__list--days">
					{month.firstDaysofMonth.map((num, i) => {
						return (
							<li className="calendar__list-item" key={i}>
								<p className="calendar__day calendar__day--filler" />
							</li>
						);
					})}

					{month.lastDatesofMonth.map((num, i) => {
						return (

							createCalendarListItem(i)
						);
					})}
				</ul>
			</div>
		</div>
		</>
	);
}

export default Calendar;
