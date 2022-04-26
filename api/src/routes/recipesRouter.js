const { Router } = require('express');
const { getRecipes, getRecipeId } = require('../Controllers/recipes');
const router = Router();

router.get('/:id', getRecipeId);
router.get('/', getRecipes);

module.exports = router;
