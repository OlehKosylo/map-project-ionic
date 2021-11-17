import {IonIcon, IonItem, IonLabel, withIonLifeCycle} from "@ionic/react";
import {star} from "ionicons/icons";
import styles from "./Way.module.scss";
import {Component} from "react";

class Way extends Component {
    state = {
        date: new Date(this.props.place.places_users
            ? this.props.place.places_users.createdAt
            : this.props.place.createdAt
        ),
        switcher: false,
        showImg: true,
        showDescription: false
    }

    setSwitcher(switcher) {
        this.setState({...this.state, switcher})
    }

    setShowDescription(status) {
        this.setState({...this.state, showDescription: status, showImg: !status})
    }

    click = () => {
        const {switcher} = this.state;
        const {status, check, place} = this.props;

        if (status) {
            check({
                switcher: !switcher,
                place
            })

            this.setSwitcher(!switcher)
        }
    }

    ionViewWillEnter() {
        this.setSwitcher(false);
    }

    render() {
        const {switcher, date, showDescription, showImg} = this.state;
        const {place, status, deletePlace, showFull, makeMark, deleteMark} = this.props;
        const {alreadyMarked, score} = place;

        return (
            <div style={{background: switcher ? 'orange' : 'black'}} className={styles.way} onClick={
                deletePlace ? () => deletePlace(place.id) : this.click
            }>
                <IonItem lines="none"
                         onClick={() => showFull && this.setShowDescription(!showDescription)}>

                    {
                        !status && showImg && <img
                            src={place.img}
                            height='50px'
                            width='80px'
                            style={{marginRight: '5px'}}
                        />
                    }

                    <IonLabel className="ion-text-wrap">
                        <div className={styles.wayInfo}>
                            <p>{date.getDate()}-{date.getMonth() + 1}-{date.getFullYear()} {date.getHours()}:{date.getMinutes()}, {place.title}</p>
                        </div>

                        {
                            (status || showDescription) && <p className={styles.wayText}>{place.description}</p>
                        }

                        <div className={styles.wayReactions}>
                            <p className={styles.wayText}>{place.tag}</p>
                            <div className={styles.wayReaction}>

                                {
                                    this.props.switcherValue === 'my'
                                    && !alreadyMarked
                                    && <>
                                        <IonIcon icon={star} onClick={() => makeMark({place_id: place.id, score: 1})}/>
                                        <IonIcon icon={star} onClick={() => makeMark({place_id: place.id, score: 2})}/>
                                        <IonIcon icon={star} onClick={() => makeMark({place_id: place.id, score: 3})}/>
                                        <IonIcon icon={star} onClick={() => makeMark({place_id: place.id, score: 4})}/>
                                    </>
                                }

                                <IonIcon
                                    icon={star}
                                    style={{color: alreadyMarked ? 'orange' : ''}}
                                    onClick={() => this.props.switcherValue === 'my' && (alreadyMarked ? deleteMark(place.id) : makeMark({
                                        place_id: place.id,
                                        score: 5
                                    }))}
                                />

                                <p style={{color: alreadyMarked ? 'orange' : ''}}>
                                    {
                                        score?.toFixed(1)
                                    }
                                </p>

                            </div>
                        </div>
                    </IonLabel>
                </IonItem>
            </div>
        )
    }
}

export default withIonLifeCycle(Way)