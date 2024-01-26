// Styles
import './header.scss';

// Assets
import logo from '../../assets/icons/logo-navy.svg';
import searchIconGrey from '../../assets/icons/search-icon-darkgrey.svg'
import filterIcon from '../../assets/icons/filter-icon.svg';
import exitIcon from '../../assets/icons/exit-icon.svg';

//Components
import CalendarWidget from '../CalendarWidget/CalendarWidget';
import AddPlayersCounter from '../AddPlayersCounter/AddPlayersCounter';
import AddressSearch from '../AddressSearch/AddressSearch';

// Dependencies
import { Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { ToggleComponentsContext } from '../../context/ToggleComponentsContext';

// Helper
import formatDate from '../../utils/formatDate';
import axios from 'axios';

function Header({ setSearchCriteria, searchCriteria }) {

    // ToggleComponents Context
    const { handleToggleClick, toggleComponents, setToggleComponents } = useContext(ToggleComponentsContext);

    // States
    // Address 
    const [addressVicinity, setAddressVicinity] = useState('')

    // User Info
    const [user, setUser] = useState({
        displayName: '',
        avatarUrl: ''
    })

    // Profile Menu
    const [isProfileClicked, setIsProfileClicked] = useState(false);

    // env Variables
    const SERVER_URL = import.meta.env.VITE_REACT_APP_SERVER_URL;

    // Variables
    let dateStartFormatted = formatDate(toggleComponents.calendar.selectedDayStart);
    let dateEndFormatted = formatDate(toggleComponents.calendar.selectedDayEnd);
    let selectedPlayers = toggleComponents.addPlayersCounter.count;

    // Functions    
    // Event Handlers

    const searchHandler = (e) => {
        e.stopPropagation();
        setSearchCriteria({
            ...searchCriteria,
            addressVicinity: (addressVicinity !== '' ? addressVicinity : ''),
            players: selectedPlayers,
            dates: {
                startDate: (toggleComponents.calendar.selectedDayStart !== '' ? dateStartFormatted : ''),
                endDate: (toggleComponents.calendar.selectedDayEnd !== '' ? dateEndFormatted : '')
            }
        })
    }

    const resetCalendarHandler = (e) => {
        e.stopPropagation();
        console.log("inside reset calendar handler")
        setToggleComponents({
            ...toggleComponents,
            calendar: { ...toggleComponents.calendar, selectedDayStart: '', selectedDayEnd: '' }
        })
    }

    const resetPlayerCounterHandler = (e) => {
        e.stopPropagation();
        setToggleComponents({
            ...toggleComponents,
            addPlayersCounter: { ...toggleComponents.addPlayersCounter, count: 0 }
        })
    }

    // UseEffects
    // Fetch User info
    useEffect(
        () => {
            (async () => {
                let user = await axios.get(`${SERVER_URL}/users/profile`, { withCredentials: true }).then((res) => res.data);
                setUser({ ...user, displayName: user['display_name'], avatarUrl: user['avatar_url'] });
            })();
        }, [])

    return (
        <>
            <header className="header" onClick={() => {
                setToggleComponents({
                    ...toggleComponents,
                    addPlayersCounter: { ...toggleComponents.addPlayersCounter, isToggled: false },
                    calendar: { ...toggleComponents.calendar, isToggled: false }
                })
            }}>
                <Link to={`/`}>
                    <div className="header__logo">
                        <img className="header__icon header__icon--logo" src={logo} alt="set logo" />
                    </div>
                </Link>

                <div className="header__inputs-container-mobile" onClick={(e) => { e.stopPropagation() }}>
                    <div className="header__search-bar-mobile" onClick={() => { handleToggleClick('searchPopUp') }}>
                        <p className="header__search-bar-input">Where, when, add players</p>
                        <img className="header__icon header__icon--search" src={searchIconGrey} alt="search icon" />
                    </div>

                    <div className="header__filter" onClick={() => { handleToggleClick('filterMenuAside') }}>
                        <img className="header__icon header__icon--filter" src={filterIcon} alt="filter icon" />
                    </div>
                </div>

                <div className="header__column">
                    <div className="header__inputs-container-desktop" onClick={(e) => e.stopPropagation()}>
                        <div className="header__input-container-desktop header__input-container-desktop--location">
                            <label className="header__label">Where</label>
                            <AddressSearch setAddressVicinity={setAddressVicinity} />
                        </div>
                        <div className="header__input-container-desktop header__input-container-desktop--date" onClick={() => {

                            setToggleComponents({
                                ...toggleComponents,
                                calendar: { ...toggleComponents.calendar, isToggled: (toggleComponents.calendar.isToggled ? false : true) },
                                addPlayersCounter: { ...toggleComponents.addPlayersCounter, isToggled: false }
                            })
                        }}>

                            {(toggleComponents.calendar.selectedDayStart !== '' || toggleComponents.calendar.selectedDayEnd !== '') && <img src={exitIcon} className="header__exit-icon" alt="exit" onClick={(e) => resetCalendarHandler(e)} />}

                            <label className="header__label">When</label>
                            {(toggleComponents.calendar.selectedDayStart === '' && toggleComponents.calendar.selectedDayEnd === '') && <p className="header__input-text-desktop">choose dates</p>}
                            {(toggleComponents.calendar.selectedDayStart !== '' && toggleComponents.calendar.selectedDayEnd !== '') && <p className="header__input-text-desktop">{`${dateStartFormatted} - ${dateEndFormatted}`}</p>}
                            {(toggleComponents.calendar.selectedDayStart !== '' && toggleComponents.calendar.selectedDayEnd === '') && <p className="header__input-text-desktop">{dateStartFormatted}</p>}

                        </div>
                        <div className="header__input-container-desktop header__input-container-desktop--players" onClick={() => {
                            setToggleComponents({
                                ...toggleComponents,
                                addPlayersCounter: { ...toggleComponents.addPlayersCounter, isToggled: (toggleComponents.addPlayersCounter.isToggled ? false : true) },
                                calendar: { ...toggleComponents.calendar, isToggled: false }
                            })
                        }}>
                            <label className="header__label">Who</label>

                            {toggleComponents.addPlayersCounter.count !== 0 && <img src={exitIcon} className="header__exit-icon header__exit-icon--players" alt="exit" onClick={(e) => resetPlayerCounterHandler(e)} />}
                            {toggleComponents.addPlayersCounter.count !== 0 ? <p className="header__input-text-desktop">{toggleComponents.addPlayersCounter.count} players</p> : <p className="header__input-text-desktop">add players</p>}

                            <div className="header__search-cta" onClick={searchHandler}>
                                <p className="header__cta">Search</p>
                            </div>
                        </div>
                    </div>
                    <div className="header__desktop-container">
                        {toggleComponents.calendar.isToggled && <CalendarWidget onClick={(e) => e.stopPropagation(e)} />}
                        {toggleComponents.addPlayersCounter.isToggled &&
                            <div className="header__add-players">
                                <p className="header__text">Players</p>
                                <AddPlayersCounter onClick={(e) => e.stopPropagation()} />
                            </div>
                        }
                    </div>
                </div>

                <div className="header__host-game">
                    <div className="header__host-game-cta">
                        <Link to={`/host-game`}>
                            <p className="header__text">Host a game</p>
                        </Link>
                        <div className="header__profile">
                            <div className="header__profile-icon" onClick={() => {setIsProfileClicked(isProfileClicked ? false : true)}}>
                                <img className="header_profile-image" src={user.avatarUrl} alt="avatar image" />
                            </div>
                        </div>
                    </div>
                    
                    {isProfileClicked ? <div className="header__profile-menu">
                        <p className="header__text header__text--small">{user.displayName}</p>
                        <p className="header__text header__text--small header__text--cta">Logout</p>
                    </div> : null}

                </div>

            </header>

            <div className="header__border"></div>
        </>
    );
}

export default Header;
