import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { postRecipe , getDiets} from "../actions"
import { useDispatch , useSelector } from "react-redux"
import styles from "../Styles/CreateRecipe.module.css"

export function validate(input) {
  let error = {};

  if (!input.title) {
    error.title = "Please, enter recipe title";
  }
  // if (!input.image) {
  //   error.image = "Please, enter recipe image";
  // }
  if (!input.summary) {
    error.summary = "Please, enter recipe summary";
  }
  if (!input.spoonacularScore) {
    error.spoonacularScore = "Please, enter recipe score";
  }
  if (input.spoonacularScore < 0 || input.spoonacularScore > 100) {
    error.spoonacularScore = "Please, enter a valid score. (Must be between 0 and 100)";
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

  const [input, setInput] = useState({
    title: "",
    // image: "",
    summary: "",
    score: "",
    healthScore: "",
    steps: "",
    diets: []
  });
  
  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  
  const [dietas, setDietas] = useState([])
  // const handleSelectDiets = (e) => {
  //   // console.log(e.target)
  //   e.preventDefault();
  //   if (input.diets?.includes(parseInt(e.target.value))) {
  //     alert("Diet's already been selected");
  //   } else {
  //     dietsState?.map(d => d.id === parseInt(e.target.value) && setDietas([...dietas, d]))
  //     setInput({ ...input, diets: [...input.diets, parseInt(e.target.value)] });
  //   }
  // };

  const handleSelectDiets = (e) => {
    e.preventDefault();
    setInput({
        ...input,
        diets: [...input.diets, e.target.value]
    })
  }
  
  const [errors, setErrors] = useState({});
  
  // useEffect(() => {
  //   console.log(Object.values(input))
  // })

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (!input.title){
    //   // e.preventDefault();
    //   alert("Empty form, please complete");
    // } else if (Object.keys(errors).length !== 0){
    //   alert("Please complete all the fields");
    // } else if (Object.keys(errors).length === 0) {
      dispatch(postRecipe(input));
      alert("receta creada con exito")
      setInput({
        title: "",
        // image: "",
        summary: "",
        score: "",
        healthScore: "",
        steps: "",
        diets: []
      });
      window.location.href = "/home";
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

  function handleDelete(e) {
    let dietsFiltered = dietas?.filter((el) => el.name !== e.name);
    console.log(e)
    console.log(dietsFiltered) 

    setInput({
      ...input,
      diets: dietsFiltered?.map(e => e.id)
    });
    setDietas(dietsFiltered)
  }

  return (
    <div className={styles.cuerpo}>
      <nav className={styles.nav}>
        <Link to="/home" className={styles.link}>
          Home
        </Link>
      </nav>
      <div className={styles.form}>
        <div className={styles.title}>Welcome!</div>
        <div className={styles.subtitle}>Let's create your own recipe!</div>

        <form onSubmit={e => handleSubmit(e)}>


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

            
            {/* <input
              className={styles.input}
              placeholder="Recipe image"
              type="text"
              name="image"
              value={input.image}
              onChange={handleChange}
            /> */}


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
            <select
              className={styles.input}
              onChange={(e) => handleSelectDiets(e)}
            >
              <option label={"Select diet"} disabled selected></option>
              {dietsState && typeof(dietsState[0]) !== "array"?dietsState.map((diet) => {
                return (
                  <option
                    key={diet.id}
                    value={diet.name}
                    name={diet.name}
                  >
                    {diet.name}
                  </option>
                );
              }): false}
            </select>

            <div className={styles.inputGroup}>
              {dietas?.map((d) => {
                return (
                  <div
                    key={d.id}
                    className={styles.inputTemp}
                    onClick={() => handleDelete(d)}
                  >
                    {d.name}
                    <p className={styles.texto}> Click to delete</p>
                  </div>
                );
              })}
            </div>
            <button className={styles.button} >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}