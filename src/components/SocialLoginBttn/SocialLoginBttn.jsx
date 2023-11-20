import './social-login-bttn.scss';
import appleIcon from  '../../assets/icons/apple.svg';
import facebookIcon from  '../../assets/icons/facebook.png';
import googleIcon from '../../assets/icons/google.svg';

const SERVER_URL = import.meta.env.VITE_REACT_APP_SERVER_URL;

function SocialLoginBttn({type}) {
 
    let logo; 
    if (type === 'facebook') {
        logo = facebookIcon
    } else if (type === 'google') {
        logo = googleIcon
    } else {
        logo = appleIcon
    }

    return(
        <>
        <div className={`social-login-bttn social-login-bttn--${type}`}>
            <div className="social-login-bttn__body">
                <img className="social-login-bttn__icon" src={logo} alt=""/>
                <a className="social-login-bttn__link" href={`${SERVER_URL}/auth/google`}><p className={`social-login-bttn__content social-login-bttn__content--${type}`}>Continue with {type}</p></a>
            </div>
        </div>
        </>
    )
}

export default SocialLoginBttn;