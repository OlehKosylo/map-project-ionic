import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import {withGoogleMap, withScriptjs} from "react-google-maps";
import {compose, withProps} from "recompose";

import './map.page.css';

import {Map} from "../../components";
import {defaultUrl} from "../../configurations";

const composedMapFunction = compose(
    withProps({
        googleMapURL: defaultUrl,
        loadingElement: <div style={{height: `100%`}}/>,
        containerElement: <div style={{height: `100%`}}/>,
        mapElement: <div style={{height: `100%`}}/>
    }),
    withScriptjs,
    withGoogleMap,
)(() => <Map/>)

const MapPage = () => {
    // const history = useHistory();
    // console.log(history)
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Map</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
          {
              composedMapFunction()
          }
      </IonContent>
    </IonPage>
  );
};

export default MapPage;
