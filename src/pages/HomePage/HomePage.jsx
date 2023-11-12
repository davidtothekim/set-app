import './home-page.scss';
import Header from '../../components/Header/Header';
import PopularTagsBar from '../../components/PopularTagsBar/PopularTagsBar';

function HomePage() {
    return(
        <>
        <main className="home-page">
            <Header/>
            <PopularTagsBar/>

        </main>
        </>
    )
}

export default HomePage;