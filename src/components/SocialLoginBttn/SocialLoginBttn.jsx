import './social-login-bttn.scss';
import appleIcon from  '../../assets/icons/apple.svg';
import facebookIcon from  '../../assets/icons/facebook.png';
import googleIcon from '../../assets/icons/google.svg';

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
                <p className="social-login-bttn__content">Continue with {type}</p>
            </div>
        </div>
        </>
    )
}

export default SocialLoginBttn;