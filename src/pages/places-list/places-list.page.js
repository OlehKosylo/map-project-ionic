import {useEffect, useState} from "react";

import {shapesOutline} from "ionicons/icons";
import {useHistory} from "react-router";
import {useDispatch} from "react-redux";

import {
    withIonLifeCycle,
    IonSearchbar,
    IonToolbar,
    IonButtons,
    IonContent,
    IonButton,
    IonFooter,
    IonHeader,
    IonIcon,
    IonPage,
    IonList,
    IonGrid,
} from "@ionic/react";

import {PlaceService, StorageService, UserService} from "../../services";
import {SET_COORDINATES} from "../../redux/action-types";
import Way from "../../components/Way/Way";

import styles from "./places-list.page.scss";

const PlacesList = () => {
    const history = useHistory()

    const [user, setUser] = useState(null)

    const [defaultListPlaces, setDefaultListPlaces] = useState([]);

    const [listPlaces, setListPlaces] = useState([]);
    const [searchText, setSearchText] = useState('');

    const [checkedPlaces, setCheckedPlaces] = useState([]);
    const dispatch = useDispatch();

    const search = (text) => {
        setSearchText(text);

        const places = defaultListPlaces.filter(place => {
            const lowerTag = place.tag.toLowerCase();
            const lowerTitle = place.title.toLowerCase();

            return lowerTag.includes(text) || lowerTitle.includes(text)
        })

        setListPlaces(places.length ? places : defaultListPlaces)
    }

    const check = ({switcher, place}) => {
        switcher
            ? setCheckedPlaces([...checkedPlaces, place])
            : setCheckedPlaces(checkedPlaces.filter(pl => pl.title !== place.title))
    }

    const startWay = () => {
        UserService.createPlacesUser(checkedPlaces.map(el => el.id)).then(() => {
            const coordinates = checkedPlaces.map(el => ({name: el.title, lat: Number(el.lat), lng: Number(el.lng)}))
            setCheckedPlaces([])

            dispatch({
                type: SET_COORDINATES,
                payload: coordinates
            })

            history.push(`/map`)
        })
    }

    useEffect(() => {
        new StorageService().getItem('access_key').then(async (jwtToken) => {
            const {data} = await UserService.getUser();
            setUser(data.user)
        })
    }, [])

    useEffect(() => {
        PlaceService.getPlaces().then(res => {
            setListPlaces(res.data)
            setDefaultListPlaces(res.data)
        })
    }, []);

    return (
        <IonContent fullscreen>
            <IonPage className={styles.page}>
                <IonSearchbar value={searchText} onIonChange={e => search(e.detail.value.toLowerCase())}></IonSearchbar>

                {
                    !checkedPlaces.length && <IonHeader>
                        <IonToolbar>
                            <IonButtons slot="end">
                                <IonButton className="custom-button" onClick={() => history.push("/")}>
                                    <IonIcon icon={shapesOutline}/>
                                </IonButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                }

                {
                    listPlaces.length && <IonGrid className="ion-no-padding">
                        <IonList>
                            {
                                listPlaces.map((place, index) => {
                                    return (
                                        <>
                                            <Way key={`way_${index}`} place={place} status={true} check={check}/>
                                        </>
                                    );
                                })
                            }
                        </IonList>
                    </IonGrid>
                }


                {
                    user && checkedPlaces.length ? <IonFooter>
                        <IonButton className={`custom-button`} expand="block" onClick={startWay}>Start way</IonButton>
                    </IonFooter> : ''
                }

            </IonPage>
        </IonContent>
    );
};

export default withIonLifeCycle(PlacesList);