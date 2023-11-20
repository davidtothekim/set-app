import './home-page.scss';
import Header from '../../components/Header/Header';
import PopularTagsBar from '../../components/PopularTagsBar/PopularTagsBar';
import HeroBanner from '../../components/HeroBanner/HeroBanner';
import EventCard from '../../components/EventCard/EventCard';
import Footer from '../../components/Footer/Footer';
import Button from '../../components/Button/Button';
import GoogleMap from '../../components/GoogleMap/GoogleMap';

import { useEffect, useState } from 'react';
import axios from 'axios';

function HomePage() {

    const SERVER_URL = import.meta.env.VITE_REACT_APP_SERVER_URL;

    // State for the list of games to display
    const [gamesList, setGamesList] = useState([]);

    // State to track whether map is toggled or not
    const [mapToggle, setMapToggle] = useState(false);

    // function to toggle map
    const handleMapToggle = () => {
        if (mapToggle) {
            setMapToggle(false)
        } else {
            setMapToggle(true)
        }
    }

    // function to filter games list
    const handleFilterClick = (filterType, filterValue) => {
        let filteredGamesList = gamesList.filter((game) => {
            return game[filterType] === filterValue
        })
        setGamesList(filteredGamesList)
    }

    // function to reset filters for the games list
    const handleResetFilterClick = () => {
        axios.get(`${SERVER_URL}/games`).then((res) => setGamesList(res.data))
    }

    useEffect(
        () => {
        (async () => {
            let games = await axios.get(`${SERVER_URL}/games`).then((res) => res.data);
            setGamesList(games);
        })();
    }, [])

    return(
        <>
        <main className="home-page">
            <Header/>
            <PopularTagsBar onClick={handleFilterClick} reset={handleResetFilterClick}/>

            <HeroBanner/>

            <div className="home-page__body container-wrapper">
                <div className="home-page__section-container content-wrapper">
                    <h2 className="home-page__sub-header">All Games</h2>

                {
                    mapToggle ? <GoogleMap games={gamesList}/> :                 <>
                    <div className="home-page__events-container">
                        {gamesList.map((game) => (
                            <EventCard game={game} key={game.index}/>
                        ))}
                    </div>
                    </>

                }    

                </div>

            </div>

            {
                mapToggle ?  <Button text="Show List" type="map" onClick={handleMapToggle}/> :  <Button text="Show Map" type="map" onClick={handleMapToggle}/>
            }

            {/* <a href={`${SERVER_URL}/auth/logout`}> Logout</a> */}

            <Footer/>

        </main>
        </>
    )
}

export default HomePage;