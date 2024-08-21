// Styles
import './footer-mobile.scss';

// Assets
import exploreIcon from '../../assets/icons/explore-icon.svg';
import myGamesIcon from '../../assets/icons/my-games-icon.svg';
import hostGameIcon from '../../assets/icons/host-game-icon.svg';
import myAccountIcon from '../../assets/icons/my-account-icon.svg';

// Dependencies
import { Link } from 'react-router-dom';

function FooterMobile() {
	return (
		<footer className="footer-mobile">
			<Link className="footer-mobile__links" to={`/`}>
				<div className="footer-mobile__link">
					<img src={exploreIcon} className="footer-mobile__icon" alt="explore" />
					<p className="footer-mobile__text">Explore</p>
				</div>
			</Link>

			<div className="footer-mobile__link">
				<img src={myGamesIcon} className="footer-mobile__icon" alt="my games" />
				<p className="footer-mobile__text">My Games</p>
			</div>

			<Link className="footer-mobile__links" to={`/host-game`}>
				<div className="footer-mobile__link">
					<img src={hostGameIcon} className="footer-mobile__icon" alt="host game" />
					<p className="footer-mobile__text">Host Game</p>
				</div>
			</Link>

			<div className="footer-mobile__link">
				<img src={myAccountIcon} className="footer-mobile__icon" alt="my account" />
				<p className="footer-mobile__text">My Account</p>
			</div>
		</footer>
	);
}

export default FooterMobile;
