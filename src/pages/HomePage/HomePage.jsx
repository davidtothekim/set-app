// Styles
import './home-page.scss';

// Components
import Header from '../../components/Header/Header';
import PopularTagsBar from '../../components/PopularTagsBar/PopularTagsBar';
import EventCard from '../../components/EventCard/EventCard';
import Footer from '../../components/Footer/Footer';
import Button from '../../components/Button/Button';
import GoogleMap from '../../components/GoogleMap/GoogleMap';
import FooterMobile from '../../components/FooterMobile/FooterMobile';
import FilterMenuAside from '../../components/FilterMenuAside/FilterMenuAside';
import SearchPopUp from '../../components/SearchPopUp/SearchPopUp';

// Dependencies
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import {ToggleComponentsContext} from '../../context/ToggleComponentsContext'; 

function HomePage() {

    // Variables
    const SERVER_URL = import.meta.env.VITE_REACT_APP_SERVER_URL;

    // ToggleComponents Context
    let { toggleComponents, handleToggleClick} = useContext(ToggleComponentsContext);

    // States
    // data of the available games from the database
    const [gamesList, setGamesList] = useState([]);

    // Functions
    // Click handler to filter the list of games in the gamesList state
    const handleFilterClick = (filterType, filterValue) => {
        let filteredGamesList = gamesList.filter((game) => {
            return game[filterType] === filterValue
        })
        setGamesList(filteredGamesList)
    }

    // Function to reset filters for the games list
    const handleResetFilterClick = () => {
        axios.get(`${SERVER_URL}/games`).then((res) => setGamesList(res.data))
    }

    // Use Effects
    // Fetch data from server
    useEffect(
        () => {
            (async () => {
                let games = await axios.get(`${SERVER_URL}/games`).then((res) => res.data);
                setGamesList(games);
            })();
        }, [])

    // Conditional Rendering
    // Check to see if the search pop up is toggled    
    if (toggleComponents.searchPopUp.isToggled) return (<SearchPopUp onClick={handleToggleClick}/>)

    return (
        <div className="home-page">

            <div className="home-page__overlay"></div>

            <div className="home-page__header">
                <Header/>
                <PopularTagsBar onClick={handleFilterClick} reset={handleResetFilterClick} />
            </div>

            <div className="home-page__main main-content">

                <div className="home-page__hero">
                </div>

                {toggleComponents.filterMenuAside.isToggled && <FilterMenuAside/>}

                <div className="home-page__content-container">
                    <h2 className="home-page__sub-header">All Games</h2>

                    {
                            toggleComponents.map.isToggled ? <GoogleMap games={gamesList} /> : <>
                                <div className="home-page__events-container">
                                    {gamesList.map((game, i) => (
                                        <EventCard game={game} key={i} />
                                    ))}
                                </div>
                            </>

                        }
                </div>

                {
                    toggleComponents.map.isToggled ? <Button text="Show List" types={["map"]} onClick={() => {handleToggleClick("map")}} /> : <Button text="Show Map" types={["map"]} onClick={() => {handleToggleClick("map")}} />
                }
            </div>

            <div className="home-page__footer">
                <Footer/>
                <FooterMobile/>
            </div>

        </div>
    )
}

export default HomePage;