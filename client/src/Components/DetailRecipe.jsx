import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch , useSelector } from "react-redux";
import { useEffect , useState} from "react";
import { getDetail, getClean } from "../actions";
import styles from "../Styles/DetailRecipe.module.css"
// import img from "../img/img2.jpg";


export default function DetailRecipe(){
    
    const dispatch = useDispatch()
    const recipeId = useParams()
    const detailRecipe = useSelector((state) => state.detail) 
    console.log(detailRecipe)
    
    useEffect(() => {
        dispatch(getDetail(recipeId.id))
        return ()=>{dispatch(getClean())}
    },[recipeId.id,dispatch])
    
    let image;
  detailRecipe.image && (image = detailRecipe.image) 

    return (
        <div className={styles.cuerpo}>
        <div>
            <div className={styles.cuerpoPagina}>
            
              <div className={styles.cuerpoTarjeta}>
              <img
                className={styles.imagen}
                src={image}
                alt={detailRecipe.title}
              />
              <h1>{detailRecipe.title}</h1>
              <p>Score: {detailRecipe.score}</p>
              <p>Healty Score: {detailRecipe.healthScore}</p>
              <p>{detailRecipe.diets?.join(',')}</p>
              <p>Summary: {detailRecipe.summary}</p>
              <p>Instructions: {detailRecipe.steps}</p>
            </div>
            </div>

          <div className={styles.boxButton}>
                <Link to="/home">
                    <button className={styles.button} >Go back!</button>
                </Link>
            </div>
       </div>
       </div>
       
    );

}

  