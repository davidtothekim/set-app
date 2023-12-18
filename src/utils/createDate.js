// Function to create a date object used to build the calendar widget

// Takes in a parameter called month which is the current month as an index between 0 (January) to 11 (December)

function createDateObj(month) {
	// Variables
	let date = new Date();
	let currYear = date.getFullYear();

	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	if (month < 0 || month > 11) {
		date = new Date(currYear, month);
		currYear = date.getFullYear();
		month = date.getMonth();
	}
	return {
		month: months[month],
		year: currYear,
		firstDaysofMonth: Array(new Date(currYear, month, 1).getDay()).fill(1),
		lastDatesofMonth: Array(new Date(currYear, month + 1, 0).getDate()).fill(1)
	};
}

export default createDateObj;
