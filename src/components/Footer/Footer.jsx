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
                    <a className="footer__links">Blog</a>
                    <a className="footer__links">Help Center</a>
                    <a className="footer__links">Contact Support</a>
                    <a className="footer__links">Release notes</a>
                    <a className="footer__links">Status</a>
                </div>
                <div className="footer__col">
                    <h3 className="footer__header">company</h3>
                    <a className="footer__links">About us</a>
                    <a className="footer__links">Careers</a>
                    <a className="footer__links">Legal</a>
                    <a className="footer__links">Privacy</a>
                    <a className="footer__links">Terms of Use</a>
                </div>
            </div>

            <div className="footer__row">
                <div className="footer__col">
                    <h3 className="footer__header">Social</h3>
                    <a className="footer__links">Twitter</a>
                    <a className="footer__links">LinkedIn</a>
                </div>
                <div className="footer__col">
                    <h3 className="footer__header">contact us</h3>
                    <a className="footer__links footer__links--email">info@set.com</a>
                </div>
            </div>

        </footer>

        <div className="footer__bottom"></div>
        </>
    )
}

export default Footer;