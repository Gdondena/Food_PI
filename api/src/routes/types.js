const { Router } = require("express");
// const axios = require("axios");
// const { Diet } = require("../db");
const { getAllTypes } = require("../controllers/getAllTypes");

const router = Router();
// - [ ] __GET /types__:
//   - Obtener todos los tipos de dieta posibles
//   - En una primera instancia, cuando no exista ninguno,
//  deberán precargar la base de datos con los tipos de datos indicados por spoonacular [acá](https://spoonacular.com/food-api/docs#Diets)

router.get("/", async (req, res) => {
  try {
    res.status(200).json(await getAllTypes());
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
