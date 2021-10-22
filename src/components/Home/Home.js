import {
    IonButton,
    IonCardTitle,
    IonCol,
    IonContent, IonFooter,
    IonGrid,
    IonPage,
    IonRouterLink,
    IonRow
} from "@ionic/react";
import styles from "./Home.module.scss";
import {Action} from "../index";

const Home = () => {
    return <IonPage className={styles.homePage}>
        <IonContent fullscreen>

            <div className={styles.getStarted}>
                <IonGrid>
                    <IonRow className={`ion-text-center ion-justify-content-center ${styles.heading}`}>
                        <IonCol size="11" className={styles.headingText}>
                            <IonCardTitle>Map project by Solomia</IonCardTitle>
                        </IonCol>
                    </IonRow>

                    <IonRow className={`ion-text-center ion-justify-content-center`}>
                        <IonRouterLink routerLink="/register" className="custom-link">
                            <IonCol size="11">
                                <IonButton className={`${styles.getStartedButton} custom-button`}>Get
                                    started &rarr;</IonButton>
                            </IonCol>
                        </IonRouterLink>
                    </IonRow>
                </IonGrid>
            </div>
        </IonContent>

        <IonFooter>
            <IonGrid>
                <Action message="Already got an account?" text="LoginPage" link="/login"/>
            </IonGrid>
        </IonFooter>
    </IonPage>
};

export default Home;