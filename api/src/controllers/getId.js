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
      summary: idApi.summary.replace(/<[^>]*>?/g, ""),
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
    const h = await Recipe.findByPk(id, {
      include: [
        {
          model: Diet,
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
    });
    const j = {
      id: h.id,
      image: h.image,
      title: h.title,
      summary: h.summary,
      score: h.score,
      healthScore: h.healthScore,
      steps: h.steps,
      diets: h.diets.map((r) => r.name),
    };
    return j;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getApiId,
  getDbId,
};
