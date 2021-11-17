import {Component} from "react";

import {withIonLifeCycle} from "@ionic/react";
import {StorageService, UserService, PlaceService,RatingsService} from "../../services";
import {Home, Profile} from "../../components";
import {countRating} from "../../helpers";


class HomePage extends Component {
    state = {
        user: null,
        places: [],
        switcherValue: 'my',
        sort: 'down'
    }

    getCreatedAt = (obj) => obj.places_users ? obj.places_users.createdAt : obj.createdAt;

    async getUserPlaces() {
        const {data} = await UserService.getUser();
        const sortedPlaces = data.places.sort((a, b) => new Date(this.getCreatedAt(b)) - new Date(this.getCreatedAt(a)))

        const mappedPlace = sortedPlaces.map(el => {
            const score = countRating(el.scores.map(el => el.score));
            const alreadyMarked = !!el.scores.find(el => el.user_id === data.user.id);

            return { ...el, score, alreadyMarked }
        })

        this.setState({user: data.user, places: mappedPlace, switcherValue: 'my'});
    }

    async getAllPlaces() {
        const {data} = await PlaceService.getPlaces()

        const mappedPlace = data.map(el => {
            const score = countRating(el.scores.map(el => el.score));

            return { ...el, score }
        })

        this.setState({places: mappedPlace, switcherValue: 'all'});
    }

    async makeMark(value) {
        const { data } = await RatingsService.createRating({
            user_id: this.state.user?.id,
            ...value
        })

        const updatedPlaces = this.state.places.map(el => {
            if(el.id === value.place_id) {
                el.score = data;
                el.alreadyMarked = true
            }

            return el
        })

        const res = await UserService.getUser();

        this.setState({ places: updatedPlaces, user: res.data.user });
    }

    async deleteMark(place_id) {
        const { data } = await RatingsService.deleteRating(place_id)

        const updatedPlaces = this.state.places.map(el => {
            if(el.id === place_id) {
                el.score = data;
                el.alreadyMarked = false;
            }

            return el
        })

        const res = await UserService.getUser();

        this.setState({ places: updatedPlaces, user: res.data.user });
    }

    sortPlaces(status) {
        const sortedPlaces = this.state.places.sort((a, b) => {
            if (status === 'down') {
                return new Date(this.getCreatedAt(b)) - new Date(this.getCreatedAt(a))
            } else {
                return new Date(this.getCreatedAt(a)) - new Date(this.getCreatedAt(b))
            }
        })

        this.setState({sort: status, places: sortedPlaces});
    }

    ionViewWillEnter() {
        new StorageService().getItem('access_key').then(async (jwtToken) => {
            if (jwtToken) {
                await this.getUserPlaces()
            } else {
                this.setState({user: false});
            }
        })
    }

    render() {
        const {user, places, switcherValue, sort} = this.state;
        return <>
            {
                user
                    ? <Profile
                        user={user}
                        places={places}
                        sort={sort}
                        switcherValue={switcherValue}
                        makeMark={this.makeMark.bind(this)}
                        deleteMark={this.deleteMark.bind(this)}
                        refreshUser={() => this.setState({user: null})}
                        getUserPlaces={this.getUserPlaces.bind(this)}
                        getAllPlaces={this.getAllPlaces.bind(this)}
                        sortPlaces={this.sortPlaces.bind(this)}
                    />
                    : <Home/>
            }
        </>
    }
}


export default withIonLifeCycle(HomePage)