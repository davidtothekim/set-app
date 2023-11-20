import './header.scss';
import logo from '../../assets/icons/logo-navy.svg';
import searchIcon from '../../assets/icons/search-icon.svg';
import filterIcon from '../../assets/icons/filter-icon.svg';

import { Link } from 'react-router-dom';

function Header() {
    return(
        <>
        <header className="header">

            <Link to={`/`}>
                <div className="header__hero">
                    <img className="header__icon header__icon--logo"src={logo} alt="set logo"/> 
                </div>
            </Link>

            <div className="header__query-container">
                <div className="header__search-bar header__search-bar--mobile">
                    <input type="text "className="header__search-input" placeholder="Where, when, add players"/>
                    <img className="header__icon header__icon--search" src={searchIcon} alt="search icon"/>
                </div>

                <div className="header__search-bar header__search-bar--desktop">
                    <input type="text" placeholder="Where" className="header__search-input-desktop"/>
                    <div className="header__search-bar-divider header__search-bar-divider--left"></div>
                    <input type="text" placeholder="When" className="header__search-input-desktop"/>
                    <div className="header__search-bar-divider header__search-bar-divider--right"></div>
                    <input type="text" placeholder="Add players" className="header__search-input-desktop"/>
                    <div className="header__search-bar-icon"></div>
                </div>


                <div className="header__filter-menu">
                    <img className="header__icon header__icon--filter" src={filterIcon} alt="filter icon"/>
                </div>
            </div>

            <div className="header__host-game-menu-container">
                <p className="header__text">Host a game</p>
                <div className="header__host-game-menu">
                    <div className="header__host-game-icon"></div>
                </div>
            </div>

        </header>
        <div className="header__border"></div>
        </>
    )
}

export default Header;