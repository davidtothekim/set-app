import './profile-menu.scss';
import logo from '../../assets/icons/logo-navy.svg'

import { Link } from 'react-router-dom';

function ProfileMenu() {
    return(
        <>
        <div className="profile-menu">
            <div className="profile-menu__hamburger-menu">
                <div className="profile-menu__bar"></div>

            </div>

        </div>
        </>
    )
}

export default ProfileMenu;