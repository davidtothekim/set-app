import './event-card.scss';
import coedIcon from '../../assets/icons/coed-icon.svg'
import backgroundImage from '../../assets/Images/coed-volleyball.jpg'

function EventCard() {
    return(
        <>
        <div className="event-card">
            <div className="event-card__body">
                <div className="event-card__body-background"></div>
                <div className="event-card__banner">
                    <div className="event-card__availbility-label">
                        <p className="event-card__availbility">2 spots left</p>
                    </div>
                    <p className="event-card__date">10/12</p>
                </div>

                <div className="event-card__banner event-card__banner--bottom">
                    <img className="event-card__icon" src={coedIcon} />
                    <p className="event-card__price">$11.70/per player</p>
                </div>
            </div>
            <div className="event-card__footer">
                <p className="event-card__location">Ellesmere Community C</p>
                <p className="event-card__date-time">TUE JAN 10, 7PM-10PM</p>
                <p className="event-card__type">BEGINNER - 6V6</p>
            </div>
        </div>
        </>
    )
}

export default EventCard;