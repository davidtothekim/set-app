//Imports
import './google-maps-marker.scss'
import {InfoWindow, Marker} from '@vis.gl/react-google-maps';
import {useState} from 'react'
import { Link } from 'react-router-dom';

function GoogleMapsMarker({position, game}) {

    const [infoWindowOpen, setInfoWindowOpen] = useState(false);

    const handleToggleOpen = () => {
        setInfoWindowOpen(true)
    }

    const handleToggleClose = () => {
        setInfoWindowOpen(false)
    }

    return(
        <>
        <Marker position={position} onClick={handleToggleOpen}>
        </Marker >
        {infoWindowOpen && <InfoWindow position={position} onCloseClick={handleToggleClose}>
            <>
                <div className="google-maps-marker__info-window-card">
                    <p className="google-maps-marker__info-window-card-header">{game.location}</p>
                    <img src={game.poster_url} className="google-maps-marker__info-window-poster" alt="game poster"/>
                    <div className="google-maps-marker__info-window-card-body">
                        <p className="google-maps-marker__info-window-card-content">{game.address}</p>
                        <p className="google-maps-marker__info-window-card-content google-maps-marker__info-window-card-content--uppercase ">{`${game.skill_level} - 6V6`}</p>
                        <Link to={`/game/${game.game_id}`} className="google-maps-marker__link">more info</Link>
                    </div>
                </div>
            
            </>
            
            
            </InfoWindow>}
        </>
    )
}

export default GoogleMapsMarker