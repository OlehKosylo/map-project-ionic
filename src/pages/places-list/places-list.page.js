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
    IonToggle
} from "@ionic/react";

import {PlaceService, StorageService, UserService} from "../../services";
import {SET_COORDINATES} from "../../redux/action-types";
import Way from "../../components/Way/Way";
import {history} from "../../App"

import styles from "./places-list.page.scss";
import {store} from "../../index";
import {countRating} from "../../helpers";

class PlacesList extends Component {
    state = {
        tags: [],
        user: null,
        fromHere: false,
        searchText: '',
        listPlaces: [],
        checkedPlaces: [],
        defaultListPlaces: []
    }

    updateState = (data) => {
        this.setState({...this.state, ...data})
    }

    search = (text) => {
        this.updateState({searchText: text})

        const places = this.state.defaultListPlaces.filter(place => {
            const lowerTag = place.tag.toLowerCase().split('-');
            const lowerTitle = place.title.toLowerCase();

            const searchText = text.toLowerCase().split(' ').filter(el => el);

            return searchText.every(v => lowerTag.includes(v)) || lowerTitle.includes(text)
        })

        const listPlaces = places.length ? places : []

        this.updateState({listPlaces})
    }

    check = ({switcher, place}) => {
        switcher
            ? this.updateState({checkedPlaces: [...this.state.checkedPlaces, place]})
            : this.updateState({checkedPlaces: this.state.checkedPlaces.filter(pl => pl.title !== place.title)})
    }

    startWay = () => {
        const {checkedPlaces, fromHere} = this.state;

        UserService.createPlacesUser(checkedPlaces.map(el => el.id)).then(() => {
            const coordinates = checkedPlaces.map(el => ({name: el.title, lat: Number(el.lat), lng: Number(el.lng)}))
            this.updateState({checkedPlaces: [], fromHere: false})

            store.dispatch({
                type: SET_COORDINATES,
                payload: {coordinates, fromHere}
            })

            history.push(`/map`)
        })
    }

    setChecked = (status) => {
        this.setState({fromHere: status})
    }

    componentDidMount() {
        new StorageService().getItem('access_key').then(async (jwtToken) => {
            const {data} = await UserService.getUser();
            this.updateState({user: data.user})
        })
    }


    ionViewWillEnter() {
        PlaceService.getPlaces().then(res => {

            const mappedPlace = res.data.map(el => {
                const score = countRating(el.scores.map(el => el.score));

                return {...el, score}
            })

            this.updateState({listPlaces: mappedPlace})
            this.updateState({defaultListPlaces: mappedPlace})
        })
    }

    render() {
        const {searchText, checkedPlaces, listPlaces, user, fromHere} = this.state;
        return (
            <IonPage className={styles.page}>
                <IonContent fullscreen>
                    {
                        <IonHeader>
                            <IonToolbar>
                                <div style={{display: 'flex'}}>
                                    <div style={{color: 'silver', opacity: '75%'}}
                                         className="ion-margin">From here
                                    </div>

                                    <IonToggle
                                        style={{marginTop: '10px'}}
                                        checked={fromHere}
                                        onIonChange={e => this.setChecked(e.detail.checked)}
                                    />
                                </div>

                                {
                                    !checkedPlaces.length && <IonButtons slot="end">
                                        <IonButton className="custom-button" onClick={() => history.push("/")}>
                                            <IonIcon icon={shapesOutline}/>
                                        </IonButton>
                                    </IonButtons>
                                }
                            </IonToolbar>
                        </IonHeader>
                    }

                    <IonSearchbar className='pinTop' value={searchText}
                                  onIonChange={e => this.search(e.detail.value.toLowerCase())}/>

                    {
                        listPlaces.length ? <IonGrid className="ion-no-padding w100 m0">
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
                        </IonGrid> : <div className='h100'></div>
                    }


                    {
                        (user && ((fromHere && checkedPlaces.length) || (!fromHere && checkedPlaces.length > 1)))
                            ? <IonFooter>
                                <IonButton className={`custom-button`} expand="block" onClick={this.startWay}>Start
                                    way</IonButton>
                            </IonFooter> : ''
                    }
                </IonContent>
            </IonPage>
        );
    }
}

export default withIonLifeCycle(PlacesList);