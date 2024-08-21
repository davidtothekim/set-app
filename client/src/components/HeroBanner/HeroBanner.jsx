import './hero-banner.scss';

function HeroBanner() {
    return(
        <>
        <div className="hero-banner container-wrapper">
            <div className="hero-banner__image"></div>
            <div className="hero-banner__body">
                <h1 className="hero-banner__header">Join the Volleyball Community</h1>
                <p className="hero-banner__content">Join our growing GTA community of volleyball players, no matter what skill level you are!</p>
                <div className="hero-banner__tags-container">
                    <div className="hero-banner__tag">
                        <h3 className="hero-banner__tag-header">20+</h3>
                        <p className="hero-banner__tag-content">Games Each Week</p>
                    </div>
                    <div className="hero-banner__tag">
                        <h3 className="hero-banner__tag-header">100+</h3>
                        <p className="hero-banner__tag-content">Players</p>
                    </div>
                </div>


            </div>
        </div>
        </>
    )
}

export default HeroBanner;