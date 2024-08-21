// Styles
import './calendar.scss';

// Dependencies
import { useContext } from 'react';
import { ToggleComponentsContext } from '../../context/ToggleComponentsContext';
import moment from 'moment';

function Calendar({ month, dateHover, setDateHover }) {

	// ToggleComponents Context
	const { toggleComponents, setToggleComponents } = useContext(ToggleComponentsContext);

	// Variables
	// Dates Ranges
	let dateRangeStart = toggleComponents.calendar.selectedDayStart;
	let dateRangeEnd = toggleComponents.calendar.selectedDayEnd;
	let dateRangeStartTimeStamp = moment(dateRangeStart).format();
	let dateRangeEndTimeStamp = moment(dateRangeEnd).format();
	let dateHoverTimeStamp = moment(dateHover).format();

	// console.log(moment('').format())
	// moment('').format() ? console.log("true") : console.log("false");

	// Functions
	// Helpers
	const setSelectedDate = (date) => {
		let dateTimeStamp = moment(date).format();

		// If there is no selectedDayStart then update selectedDayStart
		if (dateRangeStart === '') {
			setToggleComponents({
				...toggleComponents,
				calendar: { ...toggleComponents.calendar, selectedDayStart: date }
			});
		}

		// If there is a selectedDayStart date and the date is 'bigger' then the selectedDayStart update the selectedDayEnd
		if (dateRangeStart !== '') {

			if (dateTimeStamp > dateRangeStartTimeStamp) {
				setToggleComponents({
					...toggleComponents,
					calendar: { ...toggleComponents.calendar, selectedDayEnd: date }
				});
			}

		}

		// If there is a selectedDayStart and a selectedDayEnd
		if (dateRangeStart !== '' && dateRangeEnd !== '') {
			// If the selected day is larger than the selectedDayStart then updated the selectedDayEnd
			if (dateTimeStamp > dateRangeStartTimeStamp) {
				setToggleComponents({
					...toggleComponents,
					calendar: { ...toggleComponents.calendar, selectedDayEnd: date }
				});
			}

			// If the selected day is smaller than the selectedDayStart then reset both selectedDayStart and selectedDayEnd
			if (dateTimeStamp < dateRangeStartTimeStamp) {

				setToggleComponents({
					...toggleComponents,
					calendar: { ...toggleComponents.calendar, selectedDayStart:date, selectedDayEnd: ''}
				});
			}
		}

	};

	// Event Handlers
	const handleMouseOver = (e) => {
		// If start date and end date are not null then just return without updating the dateHover state
		if (toggleComponents.calendar.selectedDayStart !== '' && toggleComponents.calendar.selectedDayEnd !== '') {
			setDateHover('')
			return;
		}

		// let dateStr = `${month.month}/${parseInt(e.target.innerText)}/${month.year}`
		let num = parseInt(e.target.innerText);

		let day = num < 10 ? `0${num}` : num;
		let dateStr = `${month.month}/${day}/${month.year}`

		setDateHover(dateStr);
	};

	// Renders
	let createCalendarListItem = (i) => {
		let day = (i + 1) < 10 ? `0${i+1}` : i+1;
		let dateStr = `${month.month}/${day}/${month.year}`;
		let dateTimeStamp = moment(dateStr).format();
		// let date = new Date(dateStr).toLocaleDateString('en-US');
		
		// If a user clicks and selects a date that is equal to the selectedDayStart or selectedDayEnd
		if (dateTimeStamp === dateRangeStartTimeStamp || dateTimeStamp === dateRangeEndTimeStamp) {
			return (
				<li
					onMouseOver={handleMouseOver}
					className="calendar__list-item"
					key={i}
					onClick={() => {
						setSelectedDate(dateStr);
					}}
				>
					<p className="calendar__day calendar__day--selected">{i + 1}</p>
				</li>
			);
		}

				// If there is a selectedDayStart and a selectedDayEnd
				if (dateRangeStart!== "" && dateRangeEnd !== "") {
					// If the date is between the selectedDayStart and selectedDayEnd
					if (dateTimeStamp > dateRangeStartTimeStamp && dateTimeStamp < dateRangeEndTimeStamp) {
						return (
							<li
								onMouseOver={handleMouseOver}
								className="calendar__list-item calendar__list-item--daterange"
								key={i}
								onClick={() => {
									setSelectedDate(dateStr);
								}}
							>
								<p className="calendar__day calendar__day--daterange">{i + 1}</p>
							</li>
						);
					} else {
						return (					
						<li
							id = {i}
							onMouseOver={handleMouseOver}
							className="calendar__list-item"
							key={i}
							onClick={() => {
								setSelectedDate(dateStr);
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
							setSelectedDate(dateStr);
						}}
					>
						<p className="calendar__day">{i + 1}</p>
					</li>
		
					)
				}

		// If there is a selectedDayStart
		if (dateRangeStart !== '') {
			// Then check if the calendar date is greater than the selected date and smaller than the date the user is currently hovering over
			// This means that these dates should be highlighted in blue as the user hovers over different dates to indicate the date range they would be selecting
			if (dateTimeStamp > dateRangeStartTimeStamp && dateTimeStamp < dateHoverTimeStamp) {
				return (
					<li
						onMouseOver={handleMouseOver}
						className="calendar__list-item calendar__list-item--daterange"
						key={i}
						onClick={() => {
							setSelectedDate(dateStr);
						}}
					>
						<p className="calendar__day calendar__day--daterange">{i + 1}</p>
					</li>
				);
			}
		}

		// If niether of the conditions above apply, just return a normal list item
		return (
			<li
				id={i}
				onMouseOver={handleMouseOver}
				className="calendar__list-item"
				key={i}
				onClick={() => {
					setSelectedDate(dateStr);
				}}
			>
				<p className="calendar__day">{i + 1}</p>
			</li>
		);
	};

	return (
		<>
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
