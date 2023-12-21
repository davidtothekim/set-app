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

// Assets

// Dependencies
import { useEffect, useState } from 'react';
import axios from 'axios';
import {HomeContext} from '../../context/HomeContext';

// Helpers
import createDateObj from '../../utils/createDate';

function HomePage() {

    // Variables
    const SERVER_URL = import.meta.env.VITE_REACT_APP_SERVER_URL;
    let date = new Date();
    let currMonth = date.getMonth();

    // States
    // data of the available games from the database
    const [gamesList, setGamesList] = useState([]);
    // tracks components that can be toggled
    const [toggleComponents, setToggleComponents] = useState({
        "map" : {
            'isToggled': false
        },
        "searchPopUp": {
            'isToggled': false
        },
        "filterMenuAside": {
            'isToggled': false
        },
        "calendar": {
            'isToggled': false,
            'monthStart': createDateObj(currMonth),
            'selectedDayStart': '',
            'monthEnd' : createDateObj(currMonth + 1),
            'selectedDayEnd': ''
        },
        "addPlayersCounter": {
            isToggled: false,
            count: 0
        }
    })

    // Functions
    // Click handler to toggle the components within the toggleC state 
    const handleToggleClick = (component) => {
        if (toggleComponents[component].isToggled) {
            setToggleComponents({...toggleComponents, [component]: {...toggleComponents[component], isToggled: false}}) 
        } else {
            setToggleComponents({...toggleComponents, [component]: {...toggleComponents[component], isToggled: true}})
        }
        // componentToggles.component ? setComponentToggle(componentToggles.component = true) : setComponentToggle(componentToggles.component = false)
    }
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
    // Function to reset toggleComponents

    const resetToggleComponents = () => {
        let toggleComponents = {
            "map": {isToggled: false},
            "searchPopUp": {isToggled: false},
            "filterMenuAside": {isToggled: false},
            "calendar": {
                'isToggled': false,
                'monthStart': createDateObj(currMonth),
                'selectedDayStart': '',
                'monthEnd' : createDateObj(currMonth + 1),
                'selectedDayEnd': ''
            },
            "addPlayersCounter": {
                isToggled: false,
                count: 0
            }
        }
        return toggleComponents;
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
    if (toggleComponents.searchPopUp.isToggled) return (<HomeContext.Provider value={{toggleComponents, handleToggleClick, setToggleComponents, resetToggleComponents}}><SearchPopUp onClick={handleToggleClick}/></HomeContext.Provider>)

    return (

        <HomeContext.Provider value={{toggleComponents, handleToggleClick, setToggleComponents, resetToggleComponents}}>

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
        </HomeContext.Provider>
    )
}

export default HomePage;