import React from "react"
import {useState} from "react"
import { useDispatch, useSelector} from "react-redux"
import { searchRecipe } from "../actions"
import styles from "../Styles/SearchBar.module.css"

export default function SearchBar({title}){
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const errorMessage = useSelector(state => state.errorMessage)
    
    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(searchRecipe(name))
        setName("")
    }

    return (
        <div className={styles.container}>
            <input className={styles.textBox} type="search" placeholder="Search Recipe..." value={name} onChange={(e) => handleInputChange(e)}></input>
            <button className={styles.button} type="submit"  onClick={(e) => handleSubmit(e)}>Find Me</button>
            {errorMessage && (<p>{errorMessage}</p>)} 
        </div>
    )
}


// return(
{}
//         <div className={styles.searchBarObject}>
//             <input
//             value= {name}
//             className={styles.input}
//             type='text'
//             placeholder='Buscar...'
//             onChange={(e) => handleInputChange(e)}
//             />
//             <button type='submit' onClick={handleClick}>Buscar</button>
//             {/* <button type='submit' onClick={(e) => handleSubmit(e)}>Buscar</button> */}
//         </div>
//     )
         