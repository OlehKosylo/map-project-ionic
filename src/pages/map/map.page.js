import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import {withGoogleMap, withScriptjs} from "react-google-maps";
import {compose, withProps} from "recompose";
import { GoogleMapsLoader } from 'react-instantsearch-dom-maps';
import './map.page.css';

import {Map} from "../../components";
import {defaultUrl} from "../../configurations";
import {useHistory} from "react-router";
import {arrowBack, shapesOutline} from "ionicons/icons";
import React from "react";

compose(
    withProps({
        googleMapURL: defaultUrl,
        loadingElement: <div style={{height: `100%`}}/>,
        containerElement: <div style={{height: `100%`}}/>,
        mapElement: <div style={{height: `100%`}}/>
    }),
    withScriptjs,
    withGoogleMap,
)(() => <Map />)

const MapPage = () => {
    const history = useHistory();
    const coordinates = JSON.parse(history.location.pathname.split('/map/')[1])

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Map</IonTitle>
                    <IonButtons slot="end">
                        <IonButton className="custom-button" onClick={() =>  history.push("/")}>
                            <IonIcon icon={shapesOutline}/>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {
                    <GoogleMapsLoader apiKey="AIzaSyCfepVJvbnRPe0JcykR4d_xHRsM0udmm8Q">
                        {google =>  compose(
                            withProps({
                                googleMapURL: defaultUrl,
                                loadingElement: <div style={{height: `100%`}}/>,
                                containerElement: <div style={{height: `100%`}}/>,
                                mapElement: <div style={{height: `100%`}}/>
                            }),
                            withScriptjs,
                            withGoogleMap,
                        )(() => <Map coordinates={coordinates}/>)()}
                    </GoogleMapsLoader>


                }
            </IonContent>
        </IonPage>
    );
};

export default MapPage
