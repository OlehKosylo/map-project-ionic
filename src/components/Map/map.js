/*global google*/
import {GoogleMap, DirectionsRenderer} from "react-google-maps";
import React, {useEffect, useState} from "react";

import {FindShortestPath} from "../../helpers";
import {IonBackButton, IonButtons, IonHeader, IonToolbar} from "@ionic/react";
import {arrowBack} from "ionicons/icons";

export default ({coordinates}) => {
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

        console.log(coordinates)
        setWaypoints(coordinates || []);

        const dest = coordinates.pop()
        setDestination({name: 'destination', ...dest})
    }, [coordinates])

    useEffect(() => {
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
    }, [userLocation, destination, waypoints, travelMode])

    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton icon={arrowBack} text="" className="custom-back"/>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

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
