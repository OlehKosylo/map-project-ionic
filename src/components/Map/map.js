/*global google*/
import {GoogleMap, DirectionsRenderer} from "react-google-maps";
import React, {useEffect, useState} from "react";

import {FindShortestPath} from "../../helpers";
import {useSelector} from "react-redux";
import {useHistory} from "react-router";

export default () => {
    const history = useHistory();
    
    const [route, setRoute] = useState()
    const [destination, setDestination] = useState()
    const [userLocation, setUserLocation] = useState()
    const [waypoints, setWaypoints] = useState([])
    const [travelMode, setTravelMode] = useState('WALKING') // DRIVING, BICYCLING, TRANSIT

    const coordinates = useSelector(({map: {coordinates}}) => coordinates);

    useEffect(() => {
        const dest = coordinates.pop()

        setWaypoints(coordinates || []);
        setDestination({name: 'destination', ...dest})
    }, [coordinates])

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
                setUserLocation({
                    name: 'source',
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                })
            }
        );
    }, [])

    useEffect(() => {
        try {
            const DirectionsService = new google.maps.DirectionsService();

            if (userLocation) {
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
        } catch (e) {
            history.push('/')
        }
    }, [userLocation, destination, waypoints, travelMode, history])

    return (
        <>
            {
                route && destination && <GoogleMap
                    defaultZoom={10}
                    defaultCenter={new google.maps.LatLng(userLocation.lat, userLocation.lng)}
                >
                    <DirectionsRenderer directions={route}/>
                </GoogleMap>
            }
        </>
    );
}
