const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
const recipes= require('./recipes');
const recipe= require('./recipe');
const types= require('./types')


router.use("/recipes", recipes)
router.use("/recipe", recipe)
router.use("/types", types)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;

// - [ ] __GET /recipes?name="..."__:
//   - Obtener un listado de las recetas que contengan la palabra ingresada como query parameter
//   - Si no existe ninguna receta mostrar un mensaje adecuado
// - [ ] __GET /recipes/{idReceta}__:
//   - Obtener el detalle de una receta en particular
//   - Debe traer solo los datos pedidos en la ruta de detalle de receta
//   - Incluir los tipos de dieta asociados
// - [ ] __GET /types__:
//   - Obtener todos los tipos de dieta posibles
//   - En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos con los tipos de datos indicados por spoonacular [acá](https://spoonacular.com/food-api/docs#Diets)
// - [ ] __POST /recipe__:
//   - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
//   - Crea una receta en la base de datos
