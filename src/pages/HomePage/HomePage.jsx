import './home-page.scss';
import Header from '../../components/Header/Header';
import PopularTagsBar from '../../components/PopularTagsBar/PopularTagsBar';
import HeroBanner from '../../components/HeroBanner/HeroBanner';
import EventCard from '../../components/EventCard/EventCard';
import Footer from '../../components/Footer/Footer';

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

                    <div className="home-page__events-container">
                        <EventCard/>
                        <EventCard/>
                        <EventCard/>
                        <EventCard/>

                    </div>

                </div>
                <div className="home-page__section-container content-wrapper">
                    <h2 className="home-page__sub-header">Intermediate</h2>
                    <div className="home-page__events-container">
                        
                    </div>

                </div>
            </div>

            <Footer/>

        </main>
        </>
    )
}

export default HomePage;