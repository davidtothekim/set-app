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
import { useEffect, useState, useContext, useMemo} from 'react';
import axios from 'axios';
import {ToggleComponentsContext} from '../../context/ToggleComponentsContext'; 
import moment from 'moment';

// Helpers
// Helper
import formatDate from '../../utils/formatDate';

function HomePage() {

    // env Variables
    const SERVER_URL = import.meta.env.VITE_REACT_APP_SERVER_URL;

    // ToggleComponents Context
    let { toggleComponents, handleToggleClick} = useContext(ToggleComponentsContext);

    // States
    // Data of the available games from the database
    const [gamesList, setGamesList] = useState([]);

    // Search Criteria from Header
    const [searchCriteria, setSearchCriteria] = useState({
        dates: {
            startDate: '',
            endDate: ''
        },
        addressVicinity: '',
        players: null,
        skillLevel: '',
        gender: ''
    })

    console.log(searchCriteria)

    // Filtered Games after search
    let filteredGames = useMemo(() => {
        return gamesList.filter((game) => {
            let gameDateMoment = moment(formatDate(game.date)).format();
            let searchCriteriaStartDateMoment = moment(searchCriteria.dates.startDate).format()
            let searchCriteriaEndDateMoment = moment(searchCriteria.dates.endDate).format()

            return(
                // Address filter
                (searchCriteria.addressVicinity ? game.address.toLowerCase().includes(searchCriteria.addressVicinity.toLowerCase()) : game)
                // Players filter
                && ((game.players_limit - game.players_current) >= searchCriteria.players)
                // Dates filter
                    // start date only
                && ((searchCriteria.dates.startDate && !searchCriteria.dates.endDate) ? gameDateMoment === searchCriteriaStartDateMoment : game)
                    // start date + end date
                && ((searchCriteria.dates.startDate && searchCriteria.dates.endDate) ? (gameDateMoment >= searchCriteriaStartDateMoment && gameDateMoment <= searchCriteriaEndDateMoment) : game)
                // Popular tags filter
                
            )
        })
    })
    
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
        // axios.get(`${SERVER_URL}/games`).then((res) => setGamesList(res.data))
        filteredGames = gamesList;
        location.reload();
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
    if (toggleComponents.searchPopUp.isToggled) return (<SearchPopUp onClick={handleToggleClick} setSearchCriteria={setSearchCriteria}/>)

    return (
        <div className="home-page">

            <div className="home-page__overlay"></div>

            <div className="home-page__header">
                <Header gamesList={gamesList} setGamesList={setGamesList} setSearchCriteria={setSearchCriteria} searchCriteria={searchCriteria}/>
                <PopularTagsBar onClick={handleFilterClick} reset={handleResetFilterClick} setSearchCriteria={setSearchCriteria} searchCriteria={searchCriteria} />
            </div>

            <div className="home-page__main main-content">

                <div className="home-page__hero">
                </div>

                {toggleComponents.filterMenuAside.isToggled && <FilterMenuAside/>}

                <div className="home-page__content-container">
                    <h2 className="home-page__sub-header">All Games</h2>

                    {
                            toggleComponents.map.isToggled ? <GoogleMap games={filteredGames} /> : <>
                                <div className="home-page__events-container">
                                    {filteredGames.map((game, i) => (
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