//Dependencies
import './google-map.scss'
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    Marker,
    InfoWindow
} from '@vis.gl/react-google-maps';
import {useState, useEffect} from 'react'
import axios from 'axios';

import GoogleMapsMarker from '../../components/GoogleMapsMarker/GoogleMapsMarker';

function GoogleMap({games}) {

    const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const GOOGLE_MAP_ID = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID;

    //State to capture user's current position coordinates
    const [currentPosition, setCurrentPosition] = useState({lat: 0, lng: 0});

    const location2 = {lat: 43.77, lng: -79.3325}

    useEffect(() => {
        axios.get('https://ipapi.co/json')
            .then((res) => {
                let currentPosition = {lat: res.data.latitude, lng: res.data.longitude}
                setCurrentPosition(currentPosition)
            })

    }, [])

    return(
        <>
        <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
            <Map className="google-map" mapId={GOOGLE_MAP_ID} zoom={11} center={currentPosition}>

            <Marker position={currentPosition} label="You are here"/>



            {games.map((game) => (
                <GoogleMapsMarker position={{lat: game.lat, lng: game.lng}} key={game.index} game={game} />
            ))}


            <GoogleMapsMarker position={location2}/>

            </Map>
        </APIProvider>
        </>
    )

}

export default GoogleMap;