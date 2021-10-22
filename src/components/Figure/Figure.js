import { IonCol } from "@ionic/react";
import styles from "./Figure.module.scss";

export default (props) => (
	<IonCol size={props.size} className={ styles.figure } onClick={props.onClick}>
		<h6>{ props.count }</h6>
		<p>{ props.title }</p>
	</IonCol>
)