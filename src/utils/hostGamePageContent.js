// Dependencies
// An object containing the contents of the host game page based on the stage of the form

let pageContent = [
	{
		title: 'Step 1: Basic Info',
		description: 'Let players know what type game and players to expect',
		image: {
			name: 'serve',
			url: '/src/assets/Images/serving-image.svg'
		},
		navLink: {
			text: 'Games'
		}
	},
	{
		title: 'Step 2: Location',
		description: 'Let players know where and when the game is',
		image: {
			name: 'recieve',
			url: '/src/assets/Images/recieve-image.svg'
		},
		navLink: {
			text: 'Basic Info'
		}
	},
	{
		title: 'Step 3: Details',
		description: 'Any extra info you would like to inform players',
		image: {
			name: 'volley',
			url: '/src/assets/Images/volley-image.svg'
		},
		navLink: {
			text: 'Location'
		}
	}
];

export default pageContent;
