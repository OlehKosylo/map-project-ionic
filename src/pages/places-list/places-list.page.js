import {shapesOutline} from "ionicons/icons";
import {Component} from "react";

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
import { history } from "../../App"

import styles from "./places-list.page.scss";
import {store} from "../../index";

class PlacesList extends Component{
    state = {
        user: null,
        searchText: '',
        listPlaces: [],
        checkedPlaces: [],
        defaultListPlaces: [],

    }

    updateState = (data) => {
        this.setState({...this.state, ...data})
    }

    search = (text) => {
        this.updateState({searchText: text})

        const places = this.state.defaultListPlaces.filter(place => {
            const lowerTag = place.tag.toLowerCase();
            const lowerTitle = place.title.toLowerCase();

            return lowerTag.includes(text) || lowerTitle.includes(text)
        })

        const listPlaces = places.length ? places : this.state.defaultListPlaces

        this.updateState({listPlaces})
    }

    check = ({switcher, place}) => {
        switcher
            ? this.updateState({checkedPlaces: [...this.state.checkedPlaces, place]})
            : this.updateState({checkedPlaces: this.state.checkedPlaces.filter(pl => pl.title !== place.title)})
    }

    startWay = () => {
        const {checkedPlaces} = this.state;

        UserService.createPlacesUser(checkedPlaces.map(el => el.id)).then(() => {
            const coordinates = checkedPlaces.map(el => ({name: el.title, lat: Number(el.lat), lng: Number(el.lng)}))
            this.updateState({checkedPlaces: []})

            store.dispatch({
                type: SET_COORDINATES,
                payload: coordinates
            })

            history.push(`/map`)
        })
    }

    componentDidMount() {
        new StorageService().getItem('access_key').then(async (jwtToken) => {
            const {data} = await UserService.getUser();
            this.updateState({user: data.user})
        })
    }


    ionViewWillEnter() {
        PlaceService.getPlaces().then(res => {
            this.updateState({listPlaces: res.data})
            this.updateState({defaultListPlaces: res.data})
        })
    }

    render() {
        const {searchText, checkedPlaces, listPlaces, user} = this.state;
        return (
            <IonContent fullscreen>
                <IonPage className={styles.page}>
                    <IonSearchbar value={searchText} onIonChange={e => this.search(e.detail.value.toLowerCase())}/>

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
                                                <Way key={`way_${index}`} place={place} status={true}
                                                     check={this.check}/>
                                            </>
                                        );
                                    })
                                }
                            </IonList>
                        </IonGrid>
                    }


                    {
                        user && checkedPlaces.length ? <IonFooter>
                            <IonButton className={`custom-button`} expand="block" onClick={this.startWay}>Start
                                way</IonButton>
                        </IonFooter> : ''
                    }

                </IonPage>
            </IonContent>
        );
    }
}

export default withIonLifeCycle(PlacesList);