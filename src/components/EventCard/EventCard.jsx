import './event-card.scss';
import { Link } from 'react-router-dom';
import moment from "moment";

import coedIcon from '../../assets/icons/coed-icon.svg'

function EventCard({game}) {

    let longDateStr = moment(game.date, 'M/D/Y').format('dddd MMMM D Y')
    let longDateStrArr = longDateStr.split(' ')
    let day = longDateStrArr[0].slice(0, 3);
    let month = longDateStrArr[1].slice(0, 3);
    let monthday = longDateStrArr[2]
    
    return(
        <>
        <Link className="event-card__link" to={`/game/${game.game_id}`}>
            <div className="event-card">
                <div className="event-card__body">
                    <div className="event-card__body-background" style={{backgroundImage: "url(" + game.poster_url + ")"}}></div>
                    <div className="event-card__banner">
                        <div className="event-card__availbility-label">
                            <p className="event-card__availbility">{game.players_limit - game.players_current} spots left</p>
                        </div>
                        <p className="event-card__date">{game.date.slice(0,5)}</p>
                    </div>

                    <div className="event-card__banner event-card__banner--bottom">
                        <img className="event-card__icon" src={coedIcon} />
                        <p className="event-card__price">{`$${game.price.toFixed(2)}/per player`}</p>
                    </div>
                </div>
                <div className="event-card__footer">
                    <p className="event-card__location">{game.location}</p>
                    <p className="event-card__date-time">{`${day} ${month} ${monthday}`}, {game.start_time}-{game.end_time}</p>
                    <p className="event-card__type">{`${game.skill_level} - 6V6`}</p>
                </div>
            </div>
        </Link>
        </>
    )
}


export default EventCard;