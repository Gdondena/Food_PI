import React from "react";
import styles from "../Styles/Paginado.module.css"

export default function Paginado({recipesPerPage, allRecipes, page, currentPage, setCurrentPage}){
    const pageNumbers = [];
    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    }
    const firstPage = () => {
        setCurrentPage(1);
    }
    const lastPage = () => {
        setCurrentPage(pageNumbers.length);
    }
    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    }


    
    for(let i = 0; i < Math.ceil(allRecipes/recipesPerPage); i++){
        pageNumbers.push(i+1)
    }

    return (
        <nav>
            <div className={styles.paginate}>
            <button type='button' className={styles.first} disabled={currentPage === 1} onClick={firstPage}>FIRST</button>
            <button type='button' className={styles.prev} disabled={currentPage === 1} onClick={prevPage}>PREV</button>
                {pageNumbers?.map(n => (
                    <button type='button' className={styles.page} disabled={currentPage === n} key={n} onClick={() => page(n)}>{n}</button>
                )) //si tengo ese arr, mapealo x c/u de los num q te devuelve el paginado (la n seria c/n)
                }
            <button type='button' className={styles.next} disabled={currentPage >= pageNumbers.length} onClick={nextPage}>NEXT</button>
            <button type='button' className={styles.last} disabled={currentPage >= pageNumbers.length} onClick={lastPage}>LAST</button>
            </div>
        </nav>
    )
}