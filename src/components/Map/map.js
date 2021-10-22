/*global google*/
import {GoogleMap, DirectionsRenderer} from "react-google-maps";
import React, {useEffect, useState} from "react";

import {FindShortestPath} from "../../helpers";

export default () => {
    const [route, setRoute] = useState()
    const [travelMode, setTravelMode] = useState('WALKING') // DRIVING, BICYCLING, TRANSIT
    const [userLocation, setUserLocation] = useState()
    const [destination, setDestination] = useState()
    const [waypoints, setWaypoints] = useState([])

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
                if (!position.coords) {
                    alert('Please allow your geolocation.')
                }

                setUserLocation({
                    name: 'source',
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                })
            },
            (error) => {
                alert('Please allow your geolocation. Restart application.')
            }
        );

        // todo selected points
        setWaypoints([
            {name: 'B', lat: 49.8210729, lng: 24.041532},
            {name: 'C', lat: 49.8245162, lng: 24.0415286},
        ]);

        // todo selected last point ( does not matter )
        setDestination({name: 'destination', lat: 49.8306484, lng: 24.0492602})
    }, [])

    useEffect(() => {
        const DirectionsService = new google.maps.DirectionsService();

        if (userLocation && waypoints.length) {
            const route = new FindShortestPath(waypoints, userLocation, destination)

            const steps = route.generateSteps();
            const sourceStep = steps.shift()
            const destinationStep = steps.pop()

            DirectionsService.route(
                {
                    origin: new google.maps.LatLng(sourceStep.lat, sourceStep.lng),
                    destination: new google.maps.LatLng(destinationStep.lat, destinationStep.lng),
                    travelMode: travelMode,
                    waypoints: steps.map(direction => ({
                        location: new google.maps.LatLng(direction.lat, direction.lng)
                    }))
                },
                (result, status) => {
                    if (status === google.maps.DirectionsStatus.OK) {
                        setRoute(result);
                    }
                }
            )
        }
    }, [userLocation, destination, waypoints, travelMode])

    return (
        <>
            {
                route && <GoogleMap
                    defaultZoom={10}
                    defaultCenter={new google.maps.LatLng(userLocation.lat, userLocation.lng)}
                >
                    <DirectionsRenderer directions={route}/>
                </GoogleMap>
            }
        </>
    );
}
