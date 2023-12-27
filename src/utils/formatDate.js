// Function to format date as a string MM-DD-YYYY
// takes in a date string as a parameter in 'EN-US' format

function formatDate(dateStr) {
	let date = new Date(dateStr);
	let dateFormatted = date.toLocaleDateString('en-us', { month: 'short', day: '2-digit', year: 'numeric' });
	return dateFormatted;
}

export default formatDate;
