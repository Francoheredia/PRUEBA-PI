const { Recipe, Diet } = require('../db');

const postRecipe = async (req, res) => {
  const { name, image, score, steps, healthScore, diets, summary } = req.body;
  try {
    let recipeCreate = await Recipe.create({
      name,
      image,
      score,
      summary,
      steps,
      healthScore,
    });

    let dietsDb = await Diet.findAll({
      where: {
        name: diets,
      },
    });

    recipeCreate.addDiet(dietsDb);
    res.status(200).send({ message: 'Diet Created Successfully' });
  } catch (err) {
    console.log(err);
  }
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const findRecipeById = await Recipe.findByPk(id);
  try {
    if (!findRecipeById) {
      res.status(404).send({
        message: `Recipe with id ${id} not found`,
      });
    }

    const deleteRecipe = findRecipeById.destroy();
    if (!deleteRecipe) {
      res.status(404).send({
        message: 'No se puedo eliminar',
      });
    }
    res.status(200).send({ message: `Recipe with id: ${id} deleted` });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { postRecipe, deleteRecipe };
