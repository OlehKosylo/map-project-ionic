import {logOut, create, trashOutline} from "ionicons/icons";
import {
    IonAvatar,
    IonButton,
    IonButtons,
    IonCardSubtitle,
    IonCardTitle,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonList,
    IonPage,
    IonRow,
    IonToolbar,
    IonSegment,
    IonSegmentButton
} from '@ionic/react';


import Figure from '../Figure/Figure';
import Way from '../Way/Way';

import styles from "./Profile.module.scss";
import {AuthService, StorageService} from "../../services";
import {useHistory} from "react-router";
import {axiosInstance} from "../../helpers";
import {Wave} from "../index";

const ADMIN = 1;

const Profile = ({
                     user, places, refreshUser, sortPlaces, sort,
                     getUserPlaces, getAllPlaces, switcherValue = 'my',
                     makeMark, deleteMark
                 }) => {
        const history = useHistory();

        const logout = async () => {
            await AuthService.logOut();
            await new StorageService().removeItem('access_key');
            axiosInstance.defaults.Authorization = null;
            refreshUser();
            history.push('/')
        }

        return (
            <IonPage className={styles.page}>
                <IonHeader className="ion-no-border">
                    <IonToolbar>
                        {
                            user.user_role === ADMIN && <>
                                <IonButtons slot="start">
                                    <IonButton color="light" slot="start" onClick={() => history.push('/delete-place')}>
                                        <IonIcon icon={trashOutline}/>
                                    </IonButton>
                                    <IonButton color="light" slot="start" onClick={() => history.push('/create-place')}>
                                        <IonIcon icon={create}/>
                                    </IonButton>
                                </IonButtons>
                            </>
                        }

                        <IonButtons slot="end">
                            <IonButton color="light" slot="end" onClick={logout}>
                                <IonIcon icon={logOut}/>
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent className={styles.content}>
                    <IonGrid className={styles.top}>
                        <IonRow>
                            <IonCol size="12">
                                <IonAvatar className={styles.avatar}>
                                    <img
                                        src="https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png"/>
                                </IonAvatar>
                            </IonCol>
                        </IonRow>

                        <IonRow className={styles.profileHeader}>
                            <IonCol size="12" className="ion-text-center">
                                <IonCardTitle>{user.display_name}</IonCardTitle>
                                <IonCardSubtitle>{user.email}</IonCardSubtitle>
                            </IonCol>
                        </IonRow>
                    </IonGrid>

                    <IonGrid className={`${styles.figures} ion-no-padding ion-no-margin`}>
                        <IonRow>
                            <Figure size={places.length ? 6 : 12} count={
                                switcherValue === 'my' ? places.length : '-'
                            } title="Passed ways"/>
                            <Figure
                                size={places.length ? 6 : 12}
                                count="MAP"
                                title="Choose your way"
                                onClick={() => history.push('/place-list')}
                            />
                        </IonRow>
                    </IonGrid>

                    <IonSegment value={switcherValue}>
                        <IonSegmentButton value="my" onClick={() => getUserPlaces()}> My </IonSegmentButton>
                        <IonSegmentButton value="all" onClick={() => getAllPlaces()}> All </IonSegmentButton>
                        <IonSegmentButton onClick={() => sortPlaces( sort === 'down' ? 'up' : 'down')}> {
                            sort === 'down'
                                ? <span>△</span>
                                : <span>▽</span>
                        } </IonSegmentButton>
                    </IonSegment>

                    {
                        places.length ? <div>
                            <IonGrid className="ion-no-padding">
                                <IonList>
                                    {
                                        places.map((place) => {
                                            return (
                                                <Way key={`way_${place.id}`}
                                                     switcherValue={switcherValue}
                                                     place={place}
                                                     user={user}
                                                     showFull={true}
                                                     makeMark={makeMark}
                                                     deleteMark={deleteMark}
                                                />
                                            );
                                        })
                                    }
                                </IonList>
                            </IonGrid>
                        </div> : <div
                            style={{color: 'white', 'padding-top': '10rem', 'text-align': 'center'}}
                        >
                            This may be your advertisement
                        </div>
                    }
                </IonContent>
                <Wave/>
            </IonPage>
        );
    }
;

export default Profile;