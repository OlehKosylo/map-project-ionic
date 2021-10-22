import { IonBackButton, IonButton, IonButtons, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRouterLink, IonRow, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { arrowBack, shapesOutline } from "ionicons/icons";

import styles from './create-place.module.scss';

import { CustomField } from '../../components';
import {parseFormData, useCreatePlaceFields, validateForm} from "../../shared";
import { PlaceService } from "../../services";

const Signup = () => {

    const params = useParams();
    const history = useHistory();
    const fields = useCreatePlaceFields();
    const [ errors, setErrors ] = useState(false);

    const createPlace = async () => {
        const errors = validateForm(fields);
        setErrors(errors);

        PlaceService.createPlace(parseFormData(fields)).then(res => {
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
                            <IonCardTitle>Create new place</IonCardTitle>
                            <h5>Let's visit interesting places together</h5>
                        </IonCol>
                    </IonRow>

                    <IonRow className="ion-margin-top ion-padding-top">
                        <IonCol size="12">

                            { fields.map(field => {

                                return <CustomField field={ field } errors={ errors } />;
                            })}

                            <IonButton className="custom-button" expand="block" onClick={ createPlace }>Create place</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Signup;