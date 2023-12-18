// Styles
import './footer.scss';

// Assets
import logo from '../../assets/icons/logo-navy.svg';

// Dependencies
import { Link } from 'react-router-dom';

function Footer() {
	// Click handler to scroll to the top of the page when clicked
	const handleClick = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<footer className="footer">
			<div className="footer__top">
				<p className="footer__top-cta" onClick={handleClick}>
					top of page
				</p>
			</div>

			<div className="footer__body">
				<div className="footer__column footer__column--logo">
					<img src={logo} alt="logo" />
					<p className="footer__copyright-text">
						© Copyright 2023 <br />Set, Inc. All rights reserved
					</p>
				</div>

				<div className="footer__column">
					<h3 className="footer__header">resources</h3>
					<a className="footer__links">
						<span className="footer__link-text">Blog</span>
					</a>
					<a className="footer__links">
						<span className="footer__link-text">Help Center</span>
					</a>
					<a className="footer__links">
						<span className="footer__link-text">Contact Support</span>
					</a>
					<a className="footer__links">
						<span className="footer__link-text">Release notes</span>
					</a>
					<a className="footer__links">
						<span className="footer__link-text">Status</span>
					</a>
				</div>
				<div className="footer__column">
					<h3 className="footer__header">company</h3>
					<a className="footer__links">
						<span className="footer__link-text">About Us</span>
					</a>
					<a className="footer__links">
						<span className="footer__link-text">Careers</span>
					</a>
					<a className="footer__links">
						<span className="footer__link-text">Legal</span>
					</a>
					<a className="footer__links">
						<span className="footer__link-text">Privacy</span>
					</a>
					<a className="footer__links">
						<span className="footer__link-text">Terms of Use</span>
					</a>
				</div>
				<div className="footer__column">
					<h3 className="footer__header">social</h3>
					<a className="footer__links">
						<span className="footer__link-text">Twitter</span>
					</a>
					<a className="footer__links">
						<span className="footer__link-text">Facebook</span>
					</a>
					<a className="footer__links">
						<span className="footer__link-text">LinkedIn</span>
					</a>
				</div>
				<div className="footer__column">
					<h3 className="footer__header">contact us</h3>
					<a className="footer__links">
						<span className="footer__link-text">info@set.com</span>
					</a>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
