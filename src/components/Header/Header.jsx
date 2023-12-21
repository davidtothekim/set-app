// Styles
import './header.scss';

// Assets
import logo from '../../assets/icons/logo-navy.svg';
import searchIconGrey from '../../assets/icons/search-icon-darkgrey.svg'
import filterIcon from '../../assets/icons/filter-icon.svg';

//Components
import CalendarWidget from '../CalendarWidget/CalendarWidget';
import AddPlayersCounter from '../AddPlayersCounter/AddPlayersCounter';

// Dependencies
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import {ToggleComponentsContext} from '../../context/ToggleComponentsContext';

// Helper
import formatDate from '../../utils/formatDate';


function Header() {

    // ToggleComponents Context
    const { handleToggleClick, toggleComponents, setToggleComponents } = useContext(ToggleComponentsContext);

    // Variables
    let dateStartFormatted = formatDate(toggleComponents.calendar.selectedDayStart);
    let dateEndFormatted = formatDate(toggleComponents.calendar.selectedDayEnd);

    return (
        <>
            <header className="header" onClick={() => {
                setToggleComponents({
                    ...toggleComponents,
                    addPlayersCounter: { ...toggleComponents.addPlayersCounter, isToggled: false},
                    calendar: { ...toggleComponents.calendar, isToggled: false }
                })
            }}>
                <Link to={`/`}>
                    <div className="header__logo">
                        <img className="header__icon header__icon--logo" src={logo} alt="set logo" />
                    </div>
                </Link>

                <div className="header__inputs-container-mobile" onClick={(e) => {e.stopPropagation()}}>
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
                            <input className="header__input-desktop" type="text" placeholder="add location"></input>
                        </div>
                        <div className="header__input-container-desktop header__input-container-desktop--date" onClick={() => {

                            setToggleComponents({
                                ...toggleComponents,
                                calendar: { ...toggleComponents.calendar, isToggled: (toggleComponents.calendar.isToggled ? false : true) },
                                addPlayersCounter: { ...toggleComponents.addPlayersCounter, isToggled: false }
                            })
                        }}>
                            <label className="header__label">When</label>
                            {/* <p className="header__input-text-desktop">add dates</p> */}
                            {!toggleComponents.calendar.isToggled && (toggleComponents.calendar.selectedDayStart === '' && toggleComponents.calendar.selectedDayEnd === '') && <p className="header__input-text-desktop">add dates</p>}
                            {!toggleComponents.calendar.isToggled && (toggleComponents.calendar.selectedDayStart !== '' && toggleComponents.calendar.selectedDayEnd !== '') && <p className="header__input-text-desktop">{`${dateStartFormatted} - ${dateEndFormatted}`}</p>}
                            {!toggleComponents.calendar.isToggled && (toggleComponents.calendar.selectedDayStart !== '' && toggleComponents.calendar.selectedDayEnd === '') && <p className="header__input-text-desktop">{dateStartFormatted}</p>}

                        </div>
                        <div className="header__input-container-desktop header__input-container-desktop--players" onClick={() => {
                            setToggleComponents({
                                ...toggleComponents,
                                addPlayersCounter: { ...toggleComponents.addPlayersCounter, isToggled: (toggleComponents.addPlayersCounter.isToggled ? false : true) },
                                calendar: { ...toggleComponents.calendar, isToggled: false }
                            })
                        }}>
                            <label className="header__label">Who</label>
                            {/* <p className="header__input-text-desktop">add players</p> */}
                            {toggleComponents.addPlayersCounter.count !== 0 ? <p className="header__input-text-desktop">{toggleComponents.addPlayersCounter.count} players</p> : <p className="header__input-text-desktop">add players</p>}


                            <div className="header__search-cta">
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
                    <p className="header__text">Host a game</p>
                    <div className="header__profile">
                        <div className="header__profile-icon"></div>
                    </div>
                </div>
            </header>

            <div className="header__border"></div>
        </>
    );
}

export default Header;
