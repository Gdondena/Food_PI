const axios = require("axios");
const { API_KEY } = process.env;
const { Recipe, Diet } = require("../db");

const getApiId = async (id) => {
  try {
    const getApi = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
    );
    const idApi = getApi.data;
    return {
      id: idApi.id,
      title: idApi.title,
      summary: idApi.summary.replace(/<[^>]*>?/g, ''), //replace(/<[^>]*>?/g, ''), se puede poner esto pero no se bien q es
      healthScore: idApi.healthScore,
      image: idApi.image,
      score: idApi.spoonacularScore,
      diets: idApi.diets,
      steps: idApi.analyzedInstructions[0]?.steps.map((e) => {
        return e.step;
      }),
    };
  } catch (error) {
    return error;
  }
};

const getDbId = async (id) => {
  try {
    return await Recipe.findByPk(id, {
      include: [
        {
          model: Diet,
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
    });
  } catch (error) {
    return error;
  }
};

module.exports = {
  getApiId,
  getDbId,
};
