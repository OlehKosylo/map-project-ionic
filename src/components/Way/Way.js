import {IonIcon, IonItem, IonLabel, withIonLifeCycle} from "@ionic/react";
import {star} from "ionicons/icons";
import styles from "./Way.module.scss";
import {Component} from "react";

class Way extends Component {
    state = {
        date: new Date(this.props.place.createdAt),
        switcher: false,
        showDescription: false
    }

    setSwitcher(switcher) {
        this.setState({...this.state, switcher})
    }

    setShowDescription(status) {
        this.setState({...this.state, showDescription: status})
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
        this.setSwitcher(false)
    }

    render() {
        const {switcher, date, showDescription} = this.state;
        const {place, status, deletePlace, showFull} = this.props;

        return (
            <div style={{background: switcher ? 'orange' : 'black'}} className={styles.way} onClick={
                deletePlace ? () => deletePlace(place.id) : this.click
            }>
                <IonItem lines="none"
                         onClick={() => showFull && this.setShowDescription(!showDescription) }>
                    <IonLabel className="ion-text-wrap">
                        <div className={styles.wayInfo}>
                            <p>{date.getDay()}-{date.getMonth()}-{date.getFullYear()}, {place.title}</p>
                        </div>

                        {
                            (status || showDescription) && <p className={styles.wayText}>{place.description}</p>
                        }

                        <div className={styles.wayReactions}>
                            <p className={styles.wayText}>{place.tag}</p>
                            <div className={styles.wayReaction}></div>
                            <div className={styles.wayReaction}>
                                <IonIcon icon={star}/>
                                <p>{place.rating}</p>
                            </div>
                        </div>
                    </IonLabel>
                </IonItem>
            </div>
        )
    }
}

export default withIonLifeCycle(Way)