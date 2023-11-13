import './footer.scss';
import { Link } from 'react-router-dom';

function Footer() {

    // Click handler to scroll to the top of the page when clicked
    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return(
        <>

        <div className="footer__top">
            <p className="footer__top-cta" onClick={handleClick}>top of page</p>
        </div>   

        <footer className="footer">

            <div className="footer__row">
                <div className="footer__col">
                    <h3 className="footer__header">resources</h3>
                    <a className="footer__links"><span className="footer__link-text">Blog</span></a>
                    <a className="footer__links"><span className="footer__link-text">Help Center</span></a>
                    <a className="footer__links"><span className="footer__link-text">Contact Support</span></a>
                    <a className="footer__links"><span className="footer__link-text">Release notes</span></a>
                    <a className="footer__links"><span className="footer__link-text">Status</span></a>
                </div>
                <div className="footer__col">
                    <h3 className="footer__header"><span className="footer__link-text">Company</span></h3>
                    <a className="footer__links"><span className="footer__link-text">About us</span></a>
                    <a className="footer__links"><span className="footer__link-text">Careers</span></a>
                    <a className="footer__links"><span className="footer__link-text">Legal</span></a>
                    <a className="footer__links"><span className="footer__link-text">Privacy</span></a>
                    <a className="footer__links"><span className="footer__link-text">Terms of Use</span></a>
                </div>
            </div>

            <div className="footer__row">
                <div className="footer__col">
                    <h3 className="footer__header">Social</h3>
                    <a className="footer__links"><span className="footer__link-text">Twitter</span></a>
                    <a className="footer__links"><span className="footer__link-text">LinkedIn</span></a>
                </div>
                <div className="footer__col">
                    <h3 className="footer__header">contact us</h3>
                    <a className="footer__links footer__links--email"><span className="footer__link-text">info@set.com</span></a>
                </div>
            </div>

        </footer>

        <div className="footer__bottom"></div>
        </>
    )
}

export default Footer;