import { IonBackButton, IonButton, IonButtons, IonCardTitle, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonPage, IonRouterLink, IonRow, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';

import styles from './Signup.module.scss';

import { CustomField, Action, Wave } from '../../components';
import { arrowBack, shapesOutline } from "ionicons/icons";
import {parseFormData, useSignupFields, validateForm} from "../../shared";
import {UserService} from "../../services";

const Signup = () => {

    const params = useParams();
    const history = useHistory();
    const fields = useSignupFields();
    const [ errors, setErrors ] = useState(false);

    const createAccount = async () => {

        const errors = validateForm(fields);
        setErrors(errors);

        UserService.createUser(parseFormData(fields)).then(res => {
            history.push("/home")
        })
    }

    useEffect(() => {

        return () => {

            fields.forEach(field => field.input.state.reset(""));
            setErrors(false);
        }
    }, [params]);

    return (
        <IonPage className={ styles.signupPage }>
            <IonHeader>
                <IonToolbar>

                    <IonButtons slot="start">
                        <IonBackButton icon={ arrowBack } text="" className="custom-back" />
                    </IonButtons>

                    <IonButtons slot="end">
                        <IonButton className="custom-button"  onClick={() =>  history.push("/")}>
                            <IonIcon icon={ shapesOutline } />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonGrid className="ion-padding">
                    <IonRow>
                        <IonCol size="12" className={ styles.headingText }>
                            <IonCardTitle>Sign up</IonCardTitle>
                            <h5>Lets get to know each other</h5>
                        </IonCol>
                    </IonRow>

                    <IonRow className="ion-margin-top ion-padding-top">
                        <IonCol size="12">

                            { fields.map(field => {

                                return <CustomField field={ field } errors={ errors } />;
                            })}

                            <IonButton className="custom-button" expand="block" onClick={ createAccount }>Create account</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>

            <IonFooter>
                <IonGrid className="ion-no-margin ion-no-padding">
                    <Action message="Already got an account?" text="LoginPage" link="/login" />
                    <Wave />
                </IonGrid>
            </IonFooter>
        </IonPage>
    );
};

export default Signup;