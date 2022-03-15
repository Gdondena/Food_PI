const { Router } = require("express");
const axios = require("axios");
const { Recipe } = require("../db");
const { getAllInfo } = require("../controllers/getAll");
const { getApiId, getDbId } = require("../controllers/getId");

const router = Router();
// - [ ] __GET /recipes?name="..."__:
//   - Obtener un listado de las recetas que contengan la palabra ingresada como query parameter
//   - Si no existe ninguna receta mostrar un mensaje adecuado
router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    const recipes = await getAllInfo();
    if (name) {
      const existName = recipes.filter((e) =>
        e.title.toLowerCase().includes(name.toLowerCase())
      ); // e.title=Facturas === name: facturas
      existName.length
        ? res.status(200).send(existName)
        : res.status(404).send("No se encontro una receta con ese nombre");
    } else {
      res.status(200).send(recipes);
    }
  } catch (error) {
    res.send(error);
  }
});

// - [ ] __GET /recipes/{idReceta}__:
//   - Obtener el detalle de una receta en particular
//   - Debe traer solo los datos pedidos en la ruta de detalle de receta
//   - Incluir los tipos de dieta asociados. //  EN POKEMON ERA: Tener en cuenta que tiene que funcionar tanto para un id de un pokemon existente en pokeapi o uno creado por ustedes
//ESO ULTIMO ESTA EN CONTROLLERS, CON EL INCLUDE
router.get("/:idRecipe", async (req, res) => {
  const { idRecipe } = req.params;

  if (idRecipe.length > 20) {
    console.log("Buscando en la db");
    res.send(await getDbId(idRecipe));
  } else {
    console.log("Buscando en la api");
    res.send(await getApiId(idRecipe));
  }
});

module.exports = router;
