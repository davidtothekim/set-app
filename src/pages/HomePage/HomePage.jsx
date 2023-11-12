import './home-page.scss';
import Header from '../../components/Header/Header';
import PopularTagsBar from '../../components/PopularTagsBar/PopularTagsBar';
import HeroBanner from '../../components/HeroBanner/HeroBanner';

function HomePage() {
    return(
        <>
        <main className="home-page">
            <Header/>
            <PopularTagsBar/>
            <HeroBanner/>

            <div className="home-page__body">
                <div className="home-page__section-container content-wrapper">
                    <h2 className="home-page__sub-header">This Weekend</h2>

                </div>
                <div className="home-page__section-container content-wrapper">

                </div>
            </div>

        </main>
        </>
    )
}

export default HomePage;