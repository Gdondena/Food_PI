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




