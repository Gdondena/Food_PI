import React from "react";
import styles from "../Styles/SingleCard.module.css"
import img from "../img/img2.jpg";

export default function Card({title, name, diets, id, image}){

  image ? (image = image) : (image = img);
    return (   
      <div key={id} className={styles.cuerpoTarjeta}>
        <img className={styles.imagen} src={image} alt={name} />
        <h3>{title}</h3>
                        <ul>
                            {
                                diets.map((e)=>(
                                    <li>{e}</li>
                                ))
                            }
                        </ul>
        
        {/* <p>score: {props.score}</p>
      <p>health Score: {props.healthScore}</p> */}
        <div className={styles.contenedorVerMas}>
          <p className={styles.verMas}>Click to see more</p>
        </div>
      </div>
  );
}