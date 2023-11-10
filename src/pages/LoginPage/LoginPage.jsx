import './login-page.scss';
import logo from '../../assets/icons/logo.svg';

import SocialLoginBttn from '../../components/SocialLoginBttn/SocialLoginBttn.jsx'

function LoginPage() {
    return(
        <>
        <main className="login-page">

            <div className="login-page__hero">
                <img className="" src={logo} alt="set logo"/>
            </div>

            <div className="login-page__body">
                <SocialLoginBttn type="facebook"/>
                <SocialLoginBttn type="google"/>
                <SocialLoginBttn type="apple"/>
                <p className="login-page__content">By continuing you are agreeing to Set's <span className="text-underline">Terms of Use</span> and our <span className="text-underline">Privacy Policy</span></p>
            </div>

        </main>
        </>
    )
}

export default LoginPage;