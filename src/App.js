import { IonReactRouter } from '@ionic/react-router';
import {Redirect, Route} from 'react-router-dom';
import {IonApp, IonRouterOutlet,} from '@ionic/react';

import {RegistrationPage, MapPage, LoginPage, HomePage, PlacesList, CreatePlacePage, DeletePlacePage} from './pages';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App = () => (
    <IonApp>
        <IonReactRouter>
                <IonRouterOutlet>
                    <Route path="/home">
                        <HomePage />
                    </Route>

                    <Route exact path="/register">
                        <RegistrationPage />
                    </Route>

                    <Route exact path="/create-place">
                        <CreatePlacePage />
                    </Route>

                    <Route exact path="/delete-place">
                        <DeletePlacePage />
                    </Route>

                    <Route exact path="/map">
                        <MapPage />
                    </Route>

                    <Route exact path="/login">
                        <LoginPage />
                    </Route>

                    <Route exact path="/place-list">
                        <PlacesList />
                    </Route>

                    <Route exact path="/">
                        <Redirect to="/home" />
                    </Route>
                </IonRouterOutlet>
        </IonReactRouter>
    </IonApp>
);

export default App;
