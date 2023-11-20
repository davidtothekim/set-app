import './game-info-page.scss';
import rankingIcon from '../../assets/icons/ranking-icon.svg'
import genderIcon from '../../assets/icons/coed-icon-navy.svg'
import courtIcon from '../../assets/icons/court-icon.svg'
import confirmIcon from '../../assets/icons/confirm-icon.svg'
import peopleIcon from '../../assets/icons/people-icon.jpg'
import plusIcon from '../../assets/icons/plus-icon.svg'
import minusIcon from '../../assets/icons/minus-icon.svg'
import calendarIcon from '../../assets/icons/calendar-icon.svg'
import locationIcon from '../../assets/icons/location-icon.svg'

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Button from '../../components/Button/Button'

import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from "moment";

function GameInfoPage() {

    // Capture game id from URL
    const {gameId} = useParams();

    // Express Server URL
    const SERVER_URL = import.meta.env.VITE_REACT_APP_SERVER_URL;

        // State for the game that should be displayed on the page
        const [game, setGame] = useState({});

        useEffect(
            () => {
            (async () => {
                let game = await axios.get(`${SERVER_URL}/games/${gameId}`).then((res) => res.data[0]);
                setGame({...game,
                    "price": game.price.toFixed(2),
                    "service_fee": game["service_fee"].toFixed(2),
                    "total_price": (game.price + game["service_fee"]).toFixed(2),
                    "date": moment(game.date, 'M/D/Y').format('dddd MMMM D Y')
                })
            })();
        }, [])


    return(
        <>
        <main className="game-info-page">
            <Header/>

            <div className="game-info-page__hero container-wrapper">
                <h1 className="game-info-page__hero-title">Coed Intermediate 6v6</h1>
            </div>

            <div className="game-info-page__body container-wrapper">

                <div className="game-info-page__aside-left">

                    <p className="game-info-page__sub-header">Date & Time</p>
                        <div className="game-info-page__content-container game-info-page__content-container--indent">
                            <img className="game-info-page__icon game-info-page__icon--calendar" src={calendarIcon} alt="calendar icon"/>
                            <div className="game-info-page__content-container">
                                <p className="game-info-page__content">{game.date}</p>
                                <p className="game-info-page__content">{`${game.start_time}`} - {game.end_time} EDT</p>
                            </div>
                        </div>
                    
                    <p className="game-info-page__sub-header">Location</p>
                        <div className="game-info-page__content-container game-info-page__content-container--indent game-info-page__content-container--location">
                            <div className="game-info-page__content-container game-info-page__content-container--address">
                                <img className="game-info-page__icon game-info-page__icon--location" src={locationIcon} alt="location pin icon"/>
                                <div className="game-info-page__content-container">
                                    <p className="game-info-page__content">{game.location}</p>
                                    <p className="game-info-page__content game-info-page__content--address">{game.address}</p>
                                </div>
                            </div>
                            <div className="game-info-page__content-placeholder"></div>
                        </div>

                    <p className="game-info-page__sub-header">Game Info</p>
                        <div className="game-info-page__tags-container">
                            <div className="game-info-page__tag-container">
                                <img className="game-info-page__icon" src={rankingIcon} alt="icon of rankings podium"/>
                                <p className="game-info-page__content game-info-page__content--tag">{game.skill_level}</p>
                            </div>
                            <div className="game-info-page__tag-container">
                                <img className="game-info-page__icon" src={genderIcon} alt="icon of coed gender sign"/>
                                <p className="game-info-page__content game-info-page__content--tag">{game.gender}</p>
                            </div>
                            <div className="game-info-page__tag-container">
                                <img className="game-info-page__icon" src={courtIcon} alt="icon of coed gender sign"/>
                                <p className="game-info-page__content game-info-page__content--tag">Indoor Court</p>
                            </div>
                        </div>
                        
                    <p className="game-info-page__sub-header">Additional Info</p>
                        <div className="game-info-page__content-container">
                            <p className="game-info-page__content">{game.description}</p>
                            <p className="game-info-page__content">--</p>
                            <p className="game-info-page__content">Net Height: {game.gender}</p>
                        </div>

                    <p className="game-info-page__sub-header">Cancellation Policy</p>
                        <div className="game-info-page__content-container">
                            <p className="game-info-page__content">{game.cancellation_policy}</p>
                        </div>
                </div>

                <div className="game-info-page__aside-right">
                    <div className="game-info-page__aside-right-top">
                        <div className="game-info-page__content-container game-info-page__content-container--price">
                            <p className="game-info-page__content game-info-page__content--price"><span className="game-info-page__content game-info-page__content--large">${game.price}</span> per player</p>
                            <p className="game-info-page__content game-info-page__content--hyperlink">See All</p>
                        </div>
                        <div className="game-info-page__status-container">
                            <div className="game-info-page__status-tag game-info-page__status-tag--left">
                                <p className="game-info-page__content">Going</p>
                                <img className="game-info-page__icon" src={confirmIcon}/>
                                <p className="game-info-page__content">{game.players_current}/{game.players_limit}</p>
                            </div>
                            <div className="game-info-page__status-tag">
                                <p className="game-info-page__content">Spots Left</p>
                                <img className="game-info-page__icon" src={peopleIcon}/>
                                <p className="game-info-page__content">{game.players_limit - game.players_current}</p>
                            </div>
                        </div>
                        <Button text="Join game" type="yellow"/>
                        <div className="game-info-page__content-container game-info-page__content-container--players">
                            <p className="game-info-page__content">Players</p>
                            <div className="game-info-page__players-counter">
                                <img className="game-info-page__icon game-info-page__icon--plus-minus"src={minusIcon} alt="minus icon"/>
                                <div className="game-info-page__players-count">2</div>
                                <img className="game-info-page__icon game-info-page__icon--plus-minus" src={plusIcon} alt="plus icon"/>
                            </div>
                        </div>
                        <div className="game-info-page__content-container game-info-page__content-container--calculation">
                            <div className="game-info-page__price-calculation">
                                <p className="game-info-page__content game-info-page__content--underline">${game.price} x 1 players</p>
                                <p className="game-info-page__content">${game.price}</p>
                            </div>
                            <div className="game-info-page__price-calculation">
                                <p className="game-info-page__content game-info-page__content--underline">Service fee</p>
                                <p className="game-info-page__content">${game.service_fee}</p>
                            </div>
                        </div>
                        <div className="game-info-page__content-container game-info-page__content-container--total-price">
                            <p className="game-info-page__content game-info-page__content--bold">TOTAL</p>
                            <p className="game-info-page__content">${game.total_price}</p>
                        </div>
                    </div>

                    <Button text="Share game" type="blue"/>
                    <Button text="Message Host" type="white"/>

                    <div className="game-info-page__aside-right-bottom">
                        <div className="game-info-page__content-container game-info-page__content-container--profile">
                            <img className="game-info-page__icon game-info-page__icon--user" src={"https://lh3.googleusercontent.com/a/ACg8ocKvyuvKyIeFu6PUTBE7Mf2M_dPwiVgOqTZPeKYWMc5zJw=s96-c"} alt="profile picture of user"/>
                            <div className="game-info-page__user-container">
                                <p className="game-info-page__content game-info-page__content--bold">Kathy Dang</p>
                                <p className="game-info-page__content">Host</p>
                            </div>
                        </div>
                        <p className="game-info-page__content">Hi everyone, I will be hosting the court rental. I started volleyball 3 years ago, I mainly play outside hitter and consider myself an intermediate player. This will be my first time hosting, if you have any questions on the run please message me on this platform. Looking forward to the games! -- KD</p>
                    </div>
                </div>








            </div>

            <Footer/>

            </main>
        </>
    )
}

export default GameInfoPage;
