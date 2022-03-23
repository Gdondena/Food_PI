const axios = require("axios");
const { API_KEY } = process.env;
const { Diet } = require("../db");

const getAllTypes = async () => {
  const check = await Diet.findOne({ where: { id: 1 } });
  if (check == null) {
    const getUrl = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`
    );
    const getInfo = getUrl.data?.results
      .map((el) => {
        return [el.diets];
      })
      .flat(2)
      .concat("vegetarian");
    const result = getInfo.filter((item, index) => {
      return getInfo.indexOf(item) === index;
    });
    console.log("no habia nada");
    let obj = result.map((o) => {
      return { name: o };
    });
    let createDb = await Diet.bulkCreate(obj);

    return createDb;
  } else {
    console.log("ya hay algo");
    return Diet.findAll();
  }
};

module.exports = {
  getAllTypes,
};
