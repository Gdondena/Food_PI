const axios = require("axios");
const { API_KEY } = process.env;
const { Recipe, Diet } = require("../db");

const getApiInfo = async () => {
  try {
    const getUrl = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`
    );
    const getInfo = getUrl.data?.results.map((el) => {
      return {
        id: el.id,
        title: el.title,
        summary: el.summary,
        score: el.spoonacularScore,
        healthScore: el.healthScore,
        image: el.image,
        diets: el.diets,
        steps: el.analyzedInstructions[0]?.steps.map((e) => {
          return e.step;
        }),
      };
    });
    return getInfo;
  } catch (error) {
    return error;
  }
};

const getDataBase = async () => {
  try {
    const RAndD = await Recipe.findAll({
      include: {
        model: Diet,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });
    const newArray = [...RAndD];

    const otherArray = newArray.map((recipe) => {
      return {
        id: recipe.id,
        image: recipe.image,
        title: recipe.title,
        summary: recipe.summary,
        score: recipe.score,
        healthScore: recipe.healthScore,
        steps: recipe.steps,
        diets: recipe.diets.map((r) => r.name),
      };
    });

    return otherArray;
  } catch (error) {
    return error;
  }
};

const getAllInfo = async () => {
  const getApi = await getApiInfo();
  const getDb = await getDataBase();
  const allInfo = [...getApi, ...getDb]; //esto seria igual que concatenandolo=
  return allInfo; //getApi.concat(getDb)
};

module.exports = {
  getApiInfo,
  getDataBase,
  getAllInfo,
};
