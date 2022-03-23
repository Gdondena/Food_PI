import React from "react";
import {Link} from "react-router-dom"
import styles from "../Styles/LandingPage.module.css"

export default function LandingPage(){
    return (
        <div className={styles.background}>
            <div> 
                <h1 className={styles.apiTitle}>The Hunger Api</h1>
                <Link to ="/home">
                    <button className={styles.button}>Bite me!</button>
                </Link>
            </div>
        </div>
    )
}