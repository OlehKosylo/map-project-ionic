import {logOut} from "ionicons/icons";
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
    IonToolbar
} from '@ionic/react';

import Figure from '../Figure/Figure';
import Way from '../Way/Way';

import styles from "./Profile.module.scss";
import {AuthService, StorageService} from "../../services";
import {useHistory} from "react-router";
import {axiosInstance} from "../../helpers";
import {Wave} from "../index";

const Profile = ({user, places, refreshUser}) => {
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
                        <Figure size={ places.length ? 6 : 12} count={places.length} title="Passed ways"/>
                        <Figure
                            size={ places.length ? 6 : 12}
                            count="MAP"
                            title="Choose your way"
                            onClick={() => history.push('/place-list')}
                        />
                    </IonRow>
                </IonGrid>

                {
                    places.length ? <IonGrid className="ion-no-padding">
                        <IonList>
                            {
                                places.map((place, index) => {
                                    return (
                                        <Way key={`way_${index}`} place={place}/>
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
            <Wave/>
        </IonPage>
    );
};

export default Profile;