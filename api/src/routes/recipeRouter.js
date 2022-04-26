const express = require('express');
const { Router } = require('express');
const { postRecipe, deleteRecipe } = require('../Controllers/recipe');
const router = Router();

router.delete('/:id', deleteRecipe);
router.post('/', postRecipe);
module.exports = router;
