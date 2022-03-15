const { Router } = require('express');
 const { Recipe, Diet } = require('../db.js');

const router = Router();
//- [ ] __POST /recipe__:
//   - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
//   - Crea una receta en la base de datos
router.post('/', async (req, res) => {
const {title, summary, score, healthScore, steps, image, diets} = req.body
try {
let recipeCreate = await Recipe.create({
    title, 
    summary,
    score, 
    healthScore, 
    steps, 
    image,
})

let dietDb= await Diet.findAll({ //FindOne devuelve solo la 1ra coinc. mientras q FindAll devuelve 1 colección de todas las coincidencias
    where: {name: diets}
})

recipeCreate.addDiet(dietDb)

res.status(200).send(recipeCreate)
} catch (error) {
    res.send(error)
}
})



module.exports = router