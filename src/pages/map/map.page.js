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
import {shapesOutline} from "ionicons/icons";
import React from "react";


const MapPage = () => {
    const history = useHistory();

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
                    <GoogleMapsLoader apiKey="AIzaSyD6CRrbgObw0kL33Q4H6AZE6SKjBPOBv4Q">
                        {google =>  compose(
                            withProps({
                                googleMapURL: defaultUrl,
                                loadingElement: <div style={{height: `100%`}}/>,
                                containerElement: <div style={{height: `100%`}}/>,
                                mapElement: <div style={{height: `100%`}}/>
                            }),
                            withScriptjs,
                            withGoogleMap,
                        )(() => <Map/>)()}
                    </GoogleMapsLoader>
                }
            </IonContent>
        </IonPage>
    );
};

export default MapPage
