import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { postRecipe , getDiets} from "../actions"
import { useDispatch , useSelector } from "react-redux"
import styles from "../Styles/CreateRecipe.module.css"


export function validate(input) {
  let error = {};

  if (!input.title ) {
    error.title = "Please, enter recipe title";
  }
  if (!input.image) {
    error.image = "Please, enter recipe image";
  }
  if (!input.summary) {
    error.summary = "Please, enter recipe summary";
  }
  if (!input.score) {
    error.score = "Please, enter recipe score";
  }
  if (input.score < 0 || input.score > 100) {
    error.score = "Please, enter a valid score. (Must be between 0 and 100)";
  }
  if (!input.healthScore) {
    error.healthScore = "Please, enter recipe health score";
  }
  if (input.healthScore < 0 || input.healthScore > 100) {
    error.healthScore =
      "Please, enter a valid health score. (Must be between 0 and 100)";
  }
  if (!input.steps) {
    error.steps = "Please, enter recipe steps";
  }

  return error;
}

export default function Form() {
  const dispatch = useDispatch();
  const dietsState = useSelector((state) => state.diets);
  const [errors, setErrors] = useState({});
  
  const [input, setInput] = useState({
    title: "",
    image: "",
    summary: "",
    score: "",
    healthScore: "",
    steps: "",
    diets: []
  });
  
  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  
  function handleSelectDiets(e){
        if(input.diets.includes(e.target.value)){
            alert("Diet's already been selected")
        }else{
            setInput({
                ...input,
                diets:[...input.diets, e.target.value]
            });
            setErrors(validate({
                ...input,
                diets:[...input.diets, e.target.value]
            }))
        }
    }



  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.title) {
      // e.preventDefault();
      alert("Empty form, please complete");
    } else if (Object.keys(errors).length !== 0) {
      alert("Please complete all the fields");
    } else if (Object.keys(errors).length === 0) {
      dispatch(postRecipe(input));
      alert("receta creada con exito")
      setInput({
        title: "",
        image: "",
        summary: "",
        score: "",
        healthScore: "",
        steps: "",
        diets: []
      });
      window.location.href = "/home";
    };
  };
  
    
    
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value
      })
    );
  };

 

  function handleDelete(e){
        setInput({
            ...input,
            diets: input.diets.filter((diet)=> diet !== e)
        })
    }

  return (
    <>
      <nav className={styles.nav}>
        <Link to="/home" className={styles.link}>
          Home
        </Link>
      </nav>
        <form className={styles.form} onSubmit={e => handleSubmit(e)}>
        <h1 className={styles.title}>Welcome!</h1>
        <h2 className={styles.subtitle}>Let's create your own recipe!</h2>

          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              placeholder="Recipe title"
              type="text"
              name="title"
              value={input.title}
              onChange={handleChange}
            />

            {errors.title && <p className={styles.danger}>{errors.title}</p>}

            
            <input
              className={styles.input}
              placeholder="Recipe image"
              type="text"
              name="image"
              value={input.image}
              onChange={handleChange}
            />


            <textarea
              className={styles.input}
              placeholder="Recipe summary"
              type="text"
              name="summary"
              value={input.summary}
              onChange={handleChange}
            />

            {errors.summary && (
              <p className={styles.danger}>{errors.summary}</p>
            )}

            <div className={styles.inputGroup}>
              <input
                className={styles.input}
                placeholder="Recipe score"
                type="number"
                name="score"
                value={input.score}
                onChange={handleChange}
              />
              <input
                className={styles.input}
                placeholder="Recipe health score"
                type="number"
                name="healthScore"
                value={input.healthScore}
                onChange={handleChange}
              />
            </div>

            {errors.score && <p className={styles.danger}>{errors.score}</p>}
            {errors.healthScore && (
              <p className={styles.danger}>{errors.healthScore}</p>
            )}

            <textarea
              className={styles.input}
              placeholder="Recipe steps"
              type="text"
              name="steps"
              value={input.steps}
              onChange={handleChange}
            />
            <div >
                        <select className={styles.input} onChange={handleSelectDiets} >
                            <option label={"Select diet"} disabled selected></option>
                            {
                                dietsState.map((diet)=>(
                                    <option key={diet.id} value={input.diets.name} >{diet.name}</option>
                                ))
                            }
                        </select>
                        {errors.diets && (<p className={styles.danger}>{errors.diets}</p>)}
                    </div>

             <div>
                            {
                                input.diets.map((e)=>(
                                    <li className={styles.input} key={e}>
                                        {e} 
                                       <button  className={styles.buttondelete} onClick={()=>{handleDelete(e)}} >X</button>
                                    </li>
                                ))
                            }
 
                    </div>
            <button className={styles.button} >
              Create
            </button>
          </div>
        </form>
      </>
    
  );
}