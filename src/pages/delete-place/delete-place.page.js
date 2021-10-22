import {useEffect, useState} from "react";

import {
    IonButton,
    IonButtons,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonList,
    IonPage,
    IonToolbar
} from "@ionic/react";
import {PlaceService} from "../../services";
import Way from "../../components/Way/Way";
import {shapesOutline} from "ionicons/icons";
import styles from "../../components/Home/Home.module.scss";
import {useHistory} from "react-router";


export default () => {
    const history = useHistory()
    const [places, setPlaces] = useState([])

    useEffect(() => {
        PlaceService.getPlaces().then(res => {
            setPlaces(res.data)
        })
    }, [])


    const deletePlace = (id) => {
        PlaceService.deletePlace(id).then(res => {
            setPlaces(places.filter(pl => pl.id !== id))
        })
    }


    return <>
        <IonPage className={styles.homePage}>
            <IonContent fullscreen>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="end">
                            <IonButton className="custom-button" onClick={() => history.push("/")}>
                                <IonIcon icon={shapesOutline}/>
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>

                {
                    places.length ? <IonGrid className="ion-no-padding">
                        <IonList>
                            {
                                places.map((place, index) => {
                                    return (
                                        <Way key={`way_${index}`} place={place}
                                             deletePlace={deletePlace}/>
                                    );
                                })
                            }
                        </IonList>
                    </IonGrid> : <div
                        style={{color: 'white', 'padding-top': '10rem', 'text-align': 'center'}}
                    >
                        This may be your advertisement
                    </div>
                }
            </IonContent>
        </IonPage>
    </>
}


