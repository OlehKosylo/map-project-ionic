import {Component} from "react";

import {withIonLifeCycle} from "@ionic/react";
import {StorageService, UserService} from "../../services";
import {Home, Profile} from "../../components";


class HomePage extends Component {
    state = {
        user: null,
        places: [],
    }

    ionViewWillEnter() {
        new StorageService().getItem('access_key').then(async (jwtToken) => {
            if (jwtToken) {
                const {data} = await UserService.getUser();
                this.setState({user: data.user, places: data.places});
            } else {
                this.setState({user: false});
            }
        })
    }

    render() {
        const { user, places } = this.state;
        return <>
            {
                    user
                        ? <Profile user={user} places={places} refreshUser={() => this.setState({user: null})}/>
                        : <Home/>
            }
        </>
    }
}


export default withIonLifeCycle(HomePage)