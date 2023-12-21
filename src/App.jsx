// Styles
import './styles/style.scss';

// Components
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import GameInfoPage from './pages/GameInfoPage/GameInfoPage';
import HostGamePage from './pages/HostGamePage/HostGamePage';

// Dependencies
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToggleComponentsContext } from './context/ToggleComponentsContext';

// Helpers
import createDateObj from './utils/createDate';

function App() {
	// Variables
	let date = new Date();
	let currMonth = date.getMonth();

	//State
	// tracks components that can be toggled
	const [ toggleComponents, setToggleComponents ] = useState({
		map: {
			isToggled: false
		},
		searchPopUp: {
			isToggled: false
		},
		filterMenuAside: {
			isToggled: false
		},
		calendar: {
			isToggled: false,
			monthStart: createDateObj(currMonth),
			selectedDayStart: '',
			monthEnd: createDateObj(currMonth + 1),
			selectedDayEnd: ''
		},
		addPlayersCounter: {
			isToggled: false,
			count: 0
		}
	});

	// Functions
	// Click handler to toggle the components within the toggleC state
	const handleToggleClick = (component) => {
		if (toggleComponents[component].isToggled) {
			setToggleComponents({
				...toggleComponents,
				[component]: { ...toggleComponents[component], isToggled: false }
			});
		} else {
			setToggleComponents({
				...toggleComponents,
				[component]: { ...toggleComponents[component], isToggled: true }
			});
		}
		// componentToggles.component ? setComponentToggle(componentToggles.component = true) : setComponentToggle(componentToggles.component = false)
	};

	// Function to reset toggleComponents
	const resetToggleComponents = () => {
		let toggleComponents = {
			map: { isToggled: false },
			searchPopUp: { isToggled: false },
			filterMenuAside: { isToggled: false },
			calendar: {
				isToggled: false,
				monthStart: createDateObj(currMonth),
				selectedDayStart: '',
				monthEnd: createDateObj(currMonth + 1),
				selectedDayEnd: ''
			},
			addPlayersCounter: {
				isToggled: false,
				count: 0
			}
		};
		return toggleComponents;
	};

	return (
		<ToggleComponentsContext.Provider
			value={{ toggleComponents, handleToggleClick, setToggleComponents, resetToggleComponents }}
		>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/game" element={<GameInfoPage />} />
					<Route path="/game/:gameId" element={<GameInfoPage />} />
					<Route path="/host-game" element={<HostGamePage />} />
				</Routes>
			</BrowserRouter>
		</ToggleComponentsContext.Provider>
	);
}

export default App;
