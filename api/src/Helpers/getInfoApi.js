const axios = require('axios');
const { Recipe, Diet } = require('../db');
const { API_PI_KEY } = require('../Utils/ConstGlobal');

const getInfoApiFood = async () => {
  const foodgetAll = await axios.get(API_PI_KEY);
  const apiInfo = await foodgetAll.data.results.map((food) => {
    return {
      id: food.id,
      name: food.title,
      image: food.image,
      score: food.spoonacularScore,
      healthScore: food.healthScore,
      summary: food.summary,
      steps: food.analyzedInstructions[0]?.steps?.map((step) => step),
      diets: food.diets.map((diet) => diet),
      dishTypes: food.dishTypes.map((dish) => dish),
    };
  });
  return apiInfo;
};

// const getInfoApiFood = () => {
//   const apiResults = axios.get(API_PI_KEY).then((response) => {
//     let foodResults = response.data.results.map((foodAno) => {
//       return {
//         id: foodAno.id,
//         name: foodAno.title,
//         image: foodAno.image,
//         score: foodAno.spoonacularScore,
//         healthScore: foodAno.healthScore,
//         summary: foodAno.summary,
//         steps: foodAno.analyzedInstructions[0]?.steps?.map((step) => step),
//         diets: foodAno.diets.map((diet) => diet),
//         dishTypes: foodAno.dishTypes.map((dish) => dish),
//       };
//     });
//     return foodResults;
//   });
//   return apiResults;
// };
//aprender bien
const getInfoAPiDb = async () => {
  return await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ['name'],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllRecipeTotal = async () => {
  const infoapi = await getInfoApiFood();
  const infodb = await getInfoAPiDb();
  const infototal = infoapi.concat(infodb);
  return infototal;
};

module.exports = { getAllRecipeTotal, getInfoAPiDb, getInfoApiFood };
