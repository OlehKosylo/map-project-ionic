import { IonIcon, IonItem, IonLabel} from "@ionic/react";
import { star } from "ionicons/icons";
import styles from "./Way.module.scss";
import {useState} from "react";

export default ({place, status, check }) => {
	const date = new Date(place.createdAt)

	const [switcher, setSwitcher] = useState(false);

	const click = () => {
		if(status) {
			check({
				switcher: !switcher,
				place
			})

			setSwitcher(!switcher)
		}
	}

	return (
		<div style={{ background: switcher ? 'orange' : 'black'}} className={ styles.way } onClick={click}>
			<IonItem lines="none">
				<IonLabel className="ion-text-wrap">
					<div className={ styles.wayInfo }>
						<p>{date.getDay()}-{date.getMonth()}-{date.getFullYear()}, {place.title}</p>
					</div>

					{
						status && <p className={ styles.wayText }>{ place.description }</p>
					}

					<div className={ styles.wayReactions }>
						<p className={ styles.wayText }>{ place.tag }</p>
						<div className={ styles.wayReaction }></div>
						<div className={ styles.wayReaction }>
							<IonIcon icon={ star } />
							<p>{ place.rating }</p>
						</div>
					</div>
				</IonLabel>
			</IonItem>
		</div>
	);
}