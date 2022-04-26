const { getAllRecipeTotal } = require('../Helpers/getInfoApi');
const { Recipe } = require('../models/Recipe');

const getRecipes = async (req, res) => {
  const { name } = req.query;
  const allRecipes = await getAllRecipeTotal();
  try {
    if (name) {
      const filterNameQuery = allRecipes.filter((recipeName) =>
        recipeName.name.toLowerCase().includes(name.toLowerCase())
      );
      filterNameQuery.length
        ? res.status(200).send(filterNameQuery)
        : res
            .status(404)
            .send({ message: `Recipe with name: ${name} does not exist` });
    } else {
      res.status(200).send(allRecipes);
    }
  } catch (err) {
    console.log(err);
  }
};

const getRecipeId = async (req, res) => {
  const { id } = req.params;
  const allRecipes = await getAllRecipeTotal();
  try {
    if (id) {
      const filteredId = allRecipes.filter((recipeId) => recipeId.id == id);
      filteredId.length
        ? res.status(200).send(filteredId)
        : res
            .status(404)
            .send({ message: `Recipe with id: ${id} does not exist` });
    } else {
      res.status(404).send({ message: 'No matching id found ' });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getRecipes, getRecipeId };
