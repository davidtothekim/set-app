import './header.scss';
import logo from '../../assets/icons/logo-navy.svg';
import searchIcon from '../../assets/icons/search-icon.svg';
import filterIcon from '../../assets/icons/filter-icon.svg';

import { Link } from 'react-router-dom';

function Header() {
    return(
        <>
        <header className="header">
            <div className="header__hero">
                <img className="header__icon header__icon--logo"src={logo} alt="set logo"/> 
            </div>
            <div className="header__query-container">
                <div className="header__search-bar">
                    <input type="text "className="header__search-input" placeholder="Where, when, add players"/>
                    <img className="header__icon header__icon--search" src={searchIcon} alt="search icon"/>
                </div>
                <div className="header__filter-menu">
                    <img className="header__icon header__icon--filter" src={filterIcon} alt="filter icon"/>
                </div>
            </div>

        </header>
        </>
    )
}

export default Header;