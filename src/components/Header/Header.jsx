// Styles
import './header.scss';

// Assets
import logo from '../../assets/icons/logo-navy.svg';
import searchIcon from '../../assets/icons/search-icon-white.svg';
import searchIconGrey from '../../assets/icons/search-icon-darkgrey.svg'
import filterIcon from '../../assets/icons/filter-icon.svg';

//Components
import CalendarWidget from '../CalendarWidget/CalendarWidget';

// Dependencies
import { Link } from 'react-router-dom';
import {useContext} from 'react';
import {HomeContext} from '../../context/HomeContext';

function Header() {
    //Functions
    const {handleToggleClick} = useContext(HomeContext);

	return (
        <>
            <header className="header">
                <Link to={`/`}>
                    <div className="header__logo">
                        <img className="header__icon header__icon--logo" src={logo} alt="set logo" />
                    </div>
                </Link>

                <div className="header__inputs-container-mobile">
                    <div className="header__search-bar-mobile" onClick={() => {handleToggleClick('searchPopUp')}}>
                        <p className="header__search-bar-input">Where, when, add players</p>
                        <img className="header__icon header__icon--search" src={searchIconGrey} alt="search icon" />
                    </div>

                    <div className="header__filter" onClick={() => {handleToggleClick('filterMenuAside')}}>
                        <img className="header__icon header__icon--filter" src={filterIcon} alt="filter icon" />
                    </div>
                </div>

                <div className="header__inputs-container-desktop">

                    <div className="header__input-container-desktop header__input-container-desktop--location">
                        <label className="header__label">Where</label>
                        <input className="header__input-desktop" type="text" placeholder="add location"></input>
                    </div>

                    <div className="header__input-container-desktop header__input-container-desktop--date">
                        <label className="header__label">When</label>
                        <p className="header__input-text-desktop">add dates</p>
                    </div>

                    <div className="header__input-container-desktop header__input-container-desktop--players">
                        <label className="header__label">Who</label>
                        <p className="header__input-text-desktop">add players</p>
                        <div className="header__icon-backdrop">
                            <img className="" src={searchIcon} alt="search icon" />
                        </div>
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
