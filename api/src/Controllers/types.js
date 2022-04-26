const { Diet } = require('../db');

const getTypesDiets = async (req, res) => {
  const typesDiest = [
    'gluten free',
    'dairy free',
    'paleolithic',
    'ketogenic',
    'lacto ovo vegetarian',
    'vegan',
    'pescatarian',
    'primal',
    'fodmap friendly',
    'whole 30',
  ];
  try {
    typesDiest.forEach((diets) => {
      Diet.findOrCreate({
        where: {
          name: diets,
        },
      });
    });

    const allTypesDiets = await Diet.findAll();
    res.status(200).send(allTypesDiets);
  } catch (err) {
    console.log(err);
  }
};

module.exports = getTypesDiets;
