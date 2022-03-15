const axios = require("axios");
const { API_KEY } = process.env;
const { Diet } = require("../db");

const getApiInfo = async () => {
  try {
    const getTypeUrl = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`
    );
    const get = getTypeUrl.data?.results.map((el) => {
      return {
        id: el.id,
        title: el.title,
        image: el.image,
      };
    });
    return getInfo;
  } catch (error) {
    return error;
  }
};

const getDataBase = async () => {
  try {
    return await Recipe.findAll({
      include: {
        model: Diet,
      },
    });
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
