import {arrowBack, shapesOutline} from "ionicons/icons";
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonCardTitle,
    IonCol,
    IonContent,
    IonFooter,
    IonGrid,
    IonHeader,
    IonIcon,
    IonPage,
    IonRow,
    IonToolbar
} from '@ionic/react';
import {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router';

import styles from './Login.module.scss';

import {validateForm, useLoginFields, parseFormData} from "../../shared"
import {CustomField, Action, Wave} from '../../components'
import {AuthService, StorageService} from "../../services";
import {apiSetHeader} from "../../helpers";

const LoginPage = () => {

    const params = useParams();

    const history = useHistory();
    const fields = useLoginFields();
    const [errors, setErrors] = useState(false);

    const login = () => {
        const errors = validateForm(fields);
        setErrors(errors);

        AuthService.logIn(parseFormData(fields)).then(async (res) => {
            await new StorageService().setItem(res.data.access_token)
            apiSetHeader('Authorization', res.data.access_token);
            history.push("/")
        }).catch(e => {
            setErrors('')
        })
    }

    useEffect(() => {
        return () => {
            fields.forEach(field => field.input.state.reset(""));
            setErrors(false);
        }
    }, [params]);

    return (
        <IonPage className={styles.loginPage}>
            <IonHeader>
                <IonToolbar>

                    <IonButtons slot="start">
                        <IonBackButton icon={arrowBack} text="" className="custom-back"/>
                    </IonButtons>

                    <IonButtons slot="end">
                        <IonButton className="custom-button" onClick={() =>  history.push("/")}>
                            <IonIcon icon={shapesOutline}/>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonGrid className="ion-padding">
                    <IonRow>
                        <IonCol size="12" className={styles.headingText}>
                            <IonCardTitle>Log in</IonCardTitle>
                            <h5>Welcome back, hope you're doing well</h5>
                        </IonCol>
                    </IonRow>

                    <IonRow className="ion-margin-top ion-padding-top">
                        <IonCol size="12">

                            {fields.map(field => {
                                return <CustomField field={field} errors={errors}/>;
                            })}

                            <IonButton className="custom-button" expand="block" onClick={login}>Login</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>

            <IonFooter>
                <IonGrid className="ion-no-margin ion-no-padding">

                    <Action message="Don't have an account?" text="Sign up" link="/register"/>
                    <Wave/>
                </IonGrid>
            </IonFooter>
        </IonPage>
    );
};

export default LoginPage;