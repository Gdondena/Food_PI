import React from "react";
import styles from "../Styles/SingleCard.module.css"
import img from "../img/img2.jpg";

export default function Card(props){
let image;
  props.image ? (image = props.image) : (image = img);
    return (
        <div>
      <div key={props.id} className={styles.cuerpoTarjeta}>
        <img className={styles.imagen} src={image} alt={props.name} />
        <h3>{props.title}</h3>
        <p>{props.dishType}</p>
        <p>{props.diets}</p>
        {/* <p>score: {props.score}</p>
      <p>health Score: {props.healthScore}</p> */}
        <div className={styles.contenedorVerMas}>
          <p className={styles.verMas}>Click para ver más</p>
        </div>
      </div>
    </div>
  );
}